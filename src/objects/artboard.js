import {isArr, isFn, noop, debounce} from '../utils/core'
import {stack, stackOffsetDiverging} from 'd3-shape'
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
      default: 75
    },

    width: {
      type: Number,
      default: 300
    },

    autoResize: Boolean,

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

    clientWidth() {
      return Math.min(this.width, this.resizeWidth)
    },

    canvas() {
      let {clientWidth, height, offset} = this

      const x0 = offset[3]
      const y0 = offset[0]
      const y1 = height - offset[2]
      const x1 = clientWidth - offset[1]

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
      this.resizeWidth = width
    }
  },

  data: () => ({
    space: [0, 0, 0, 0],
    resizeWidth: Infinity,
    props: [],
    store: {}
  }),

  mounted() {
    if (this.autoResize) {
      this.resize()
      window.addEventListener('resize', debounce(this.resize))
    }
  },

  /**
   * @todo Need to optimize. The Props changes will call update even if it does not need.
   * https://github.com/vuejs/vue/issues/5727
   */
  render(h) {
    const {clientWidth, height} = this
    const slots = this.$slots.default || []

    /**
     * Reset snap
     */
    this.snap = {}

    const props = []
    const charts = []
    const objects = []
    const widgets = []

    slots.forEach(slot => {
      const options = slot.componentOptions
      if (!options) {
        return
      }
      const sealed = options.Ctor.sealedOptions
      if (!sealed) {
        return
      }
      const {propsData} = options

      switch (sealed.type) {
        case 'chart':
          if (props.indexOf(propsData.prop) < 0) {
            props.push(propsData.prop)
          }
          slot.index = charts.length
          if (sealed.preload) {
            sealed.preload({data: propsData, parent: this, index: slot.index})
          }
          charts.push(slot)
          break
        case 'object':
          if (sealed.space) {
            sealed.space.forEach((val, i) => {
              this.space[i] = Math.max(val, this.space[i] || 0)
            })
          }
          objects.push(slot)
          break
        case 'widget':
          widgets.push(slot)
          break
        default:
          break
      }
    })

    this.props = props

    return h(
      'div',
      {
        style: {
          position: 'relative',
          width: clientWidth + 'px'
        }
      },
      [
        h(
          'svg',
          {
            attrs: {
              width: clientWidth,
              height,
              viewBox: `0 0 ${clientWidth} ${height}`
            }
          },
          [].concat(objects, charts)
        ),
        widgets
      ]
    )
  }
}
