import {isArr, isFn, noop, debounce, isNil} from '../utils/core'
import stack from 'd3-shape/src/stack'
import stackOffsetDiverging from 'd3-shape/src/offset/diverging'
import {bound} from '../utils/math'

export default {
  name: 'LaArtboard',

  props: {
    data: {
      type: Array,
      default: () => []
    },

    height: {
      type: Number,
      default: 300
    },

    width: {
      type: Number,
      default: 600
    },

    autoresize: Boolean,

    padding: {
      default: 8,
      type: [Number, Array]
    },

    bound: {
      type: Array,
      default: () => []
    },

    narrow: [Boolean, Number, Function],

    distance: {
      default: 0,
      type: Number
    },

    stacked: Boolean,

    /**
     * The default colors is "walden" from ECharts
     * @see http://echarts.baidu.com/theme-builder/
     */
    colors: {
      default: () => [
        '#3fb1e3',
        '#6be6c1',
        '#626c91',
        '#a0a7e6',
        '#c4ebad',
        '#96dee8'
      ],
      type: [Array, Function]
    },

    textColor: {
      type: String,
      default: '#999'
    }
  },

  computed: {
    offset() {
      const {padding, space} = this
      const pad = []

      for (let i = 0; i < 4; i++) {
        const p = isArr(padding) ? padding[i] || 0 : padding
        const s = space[i]
        pad[i] = isFn(p) ? p(s) : s + p
      }

      return pad
    },

    viewWidth() {
      const {parentWidth, width} = this
      return isNil(parentWidth) ? width : parentWidth
    },

    canvas() {
      const {viewWidth, height, offset} = this
      const x0 = offset[3]
      const y0 = offset[0]
      const y1 = height - offset[2]
      const x1 = viewWidth - offset[1]

      return {
        x0,
        y0,
        width: x1 - x0,
        height: y1 - y0,
        x1,
        y1
      }
    },

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
    },

    curData() {
      return stack()
        .keys(this.props)
        .offset(this.stacked ? stackOffsetDiverging : noop)(this.data)
    }
  },

  provide() {
    return {
      Artboard: this
    }
  },

  methods: {
    genColor(index) {
      const {colors} = this

      if (isArr(colors)) {
        return colors[index % colors.length]
      }

      return colors(index)
    },

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
    },

    resize() {
      const {width} = this.$el.getBoundingClientRect()
      this.parentWidth = width
    },

    addSpace(space = []) {
      space.forEach((val, i) => {
        this.space[i] = Math.max(val, this.space[i] || 0)
      })
    }
  },

  data: () => ({
    space: [0, 0, 0, 0],
    parentWidth: null,
    props: [],
    store: {}
  }),

  mounted() {
    if (this.autoresize) {
      this.resize()
      window.addEventListener('resize', debounce(this.resize))
    }
  },

  /**
   * @todo Need to optimize. The Props changes will call update even if it does not need.
   * https://github.com/vuejs/vue/issues/5727
   */
  render(h) {
    const {viewWidth, height, autoresize} = this
    const slots = this.$slots.default || []

    if (!this.data.length) {
      return
    }

    /**
     * Reset snap
     */
    this.snap = {}

    const props = []
    const charts = []
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
        case 'chart':
          if (prop && props.indexOf(prop) < 0) {
            props.push(prop)
          }
          slot.index = charts.length
          charts.push(slot)
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
          [others, charts, objects]
        ),
        widgets
      ]
    )
  }
}
