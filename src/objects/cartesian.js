import plane from '../mixins/plane'
import {isFn} from '../utils/core'
import {bound} from '../utils/math'

export default {
  name: 'LaCartesian',

  mixins: [plane],

  props: {
    bound: {
      type: Array,
      default: () => []
    },

    narrow: [Boolean, Number, Function],

    distance: {
      default: 0,
      type: Number
    }
  },

  computed: {
    high() {
      return this.getBound(this.bound[1], 'max')
    },

    low() {
      return this.getBound(this.bound[0], 'min')
    },

    len() {
      return this.data.length
    },

    tempXRatio() {
      const {len} = this
      return len <= 1 ? 0 : this.canvas.width / (len - 1)
    },

    gap() {
      const {narrow, tempXRatio} = this

      if (isFn(narrow)) {
        return narrow(tempXRatio)
      }
      if (narrow === true) {
        return tempXRatio / 2
      }
      return Number(narrow)
    },

    xRatio() {
      return this.tempXRatio ?
        this.tempXRatio - 2 * this.gap / (this.len - 1) :
        0
    },

    yRatio() {
      return this.canvas.height / (this.high - this.low)
    }
  },

  methods: {
    getBound(val, type) {
      if (typeof val === 'number') {
        return val
      }

      const isMin = type === 'min'
      let result = bound(this.curData, type, isMin ? 0 : 1)

      if (isMin && result === 0) {
        result = bound(this.curData, 'min', 1)
      }

      if (isFn(val)) {
        return val(result)
      }

      return result
    }
  },

  /**
   * @todo Need to optimize. The Props changes will call update even if it does not need.
   * https://github.com/vuejs/vue/issues/5727
   */
  render(h) {
    const {viewWidth, height, autoresize} = this
    const slots = this.$slots.default || []

    /**
     * Reset snap
     */
    this.snap = {}

    const props = []
    const cartesians = []
    const objects = []
    const widgets = []
    const others = []

    slots.forEach(slot => {
      const options = slot.componentOptions
      if (!options) {
        others.push(slot)
        return
      }
      const sealed = options.Ctor.sealedOptions
      if (!sealed) {
        return
      }
      const {propsData} = options
      const {prop} = propsData

      switch (sealed.type) {
        case 'cartesian':
          if (prop && props.indexOf(prop) < 0) {
            props.push(prop)
          }
          slot.index = cartesians.length
          cartesians.push(slot)
          break
        case 'object':
          this.addSpace(sealed.space)
          objects.push(slot)
          break
        case 'widget':
          widgets.push(slot)
          break
        default:
          break
      }
      if (sealed.preload) {
        sealed.preload({data: propsData, parent: this, index: slot.index})
      }
    })

    this.props = props

    return h(
      'div',
      {
        style: {
          position: 'relative',
          width: autoresize ? '100%' : viewWidth + 'px'
        }
      },
      [
        h(
          'svg',
          {
            attrs: {
              width: viewWidth,
              height,
              viewBox: `0 0 ${viewWidth} ${height}`
            }
          },
          [others, cartesians, objects]
        ),
        widgets
      ]
    )
  }
}
