import {isArr, isFn, isNil, toArr} from '../utils/core'
import {sum} from '../utils/math'

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

    padding: {
      default: 8,
      type: [Number, Array]
    },

    bound: {
      type: Array,
      default: () => []
    },

    gap: [Boolean, Number, Function],

    /**
     * @todo
     */
    horizontal: Boolean,

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
    curPadding() {
      const {padding, space} = this
      const isNum = typeof padding === 'number'
      const pad = []

      for (let i = 0; i < 4; i++) {
        const p = isNum ? padding : padding[i] || 0
        const s = space[i]
        pad[i] = isFn(p) ? p(s) : s + p
      }

      return pad
    },

    canvas() {
      let {width, height, curPadding} = this

      const x0 = curPadding[3]
      const y0 = curPadding[0]
      const y1 = height - curPadding[2]
      const x1 = width - curPadding[1]

      width = x1 - x0
      height = y1 - y0

      return {x0, y0, width, height, x1, y1}
    },

    high() {
      return this.getBound(this.bound[1], 'max')
    },

    low() {
      return this.getBound(this.bound[0], 'min')
    },

    tempXRatio() {
      return this.canvas.width / (this.data.length - 1)
    },

    curGap() {
      const {gap, tempXRatio} = this
      if (isFn(gap)) {
        return gap(tempXRatio)
      }
      if (gap === true) {
        return tempXRatio / 2
      }
      return Number(gap)
    },

    xRatio() {
      const {curGap, tempXRatio} = this
      return tempXRatio - 2 * curGap / (this.data.length - 1)
    }
  },

  data: () => ({
    store: {}
  }),

  provide() {
    return {
      Artboard: this
    }
  },

  methods: {
    getPoints(values) {
      const {x0, height, y1} = this.canvas
      const valids = values.filter(n => !isNil(n))
      const min = Math.floor(Math.min(...valids, this.low))
      const max = Math.ceil(Math.max(...valids, this.high))
      const yRatio = height / (max - min)
      const {curGap, xRatio} = this

      return values.map((value, i) => {
        const y = isNil(value) ? null : y1 - (value - min) * yRatio
        const x = x0 + xRatio * i + curGap

        return [x, y]
      })
    },

    genColor(index) {
      const {colors} = this

      if (isArr(colors)) {
        return colors[index % colors.length]
      }

      return colors(index)
    },

    getBound(bound, type) {
      if (typeof bound === 'number') {
        return bound
      }

      const {props, data} = this
      let val

      if (this.stacked && type === 'max') {
        val = Math.max.apply(null, data.map(o => sum(toArr(o, props))))
      } else {
        val = Math[type].apply(
          null,
          data.map(o => Math[type].apply(null, toArr(o, props)))
        )
      }

      if (isFn(bound)) {
        return bound(val)
      }

      return val
    }
  },

  created() {
    this.space = []
  },

  /**
   * @todo Need to optimize. The Props changes will call update even if it does not need.
   * https://github.com/vuejs/vue/issues/5727
   */
  render(h) {
    const {width, height} = this
    const slots = this.$slots.default || []

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

      switch (sealed.type) {
        case 'chart':
          if (props.indexOf(options.propsData.prop) < 0) {
            props.push(options.propsData.prop)
          }
          slot.index = charts.length
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
        case 'widgets':
          widgets.push(slot)
          break
        default:
          break
      }
    })

    this.props = props

    return h('div', [
      h(
        'svg',
        {
          attrs: {
            width,
            height,
            viewBox: `0 0 ${width} ${height}`
          }
        },
        [].concat(charts, objects)
      ),
      widgets
    ])
  }
}
