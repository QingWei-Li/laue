import {isArr, isFn} from '../utils/core'

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
      type: Number
    },

    /**
     * Manual optimization
     */
    maxValue: {
      type: Number,
      default: -Infinity
    },

    /**
     * Manual optimization
     */
    minValue: {
      type: Number,
      default: Infinity
    },

    /**
     * Top, right, bottom, left
     */
    space: {
      type: Array,
      default: () => [null, null, null, null]
    },

    /**
     * @todo
     */
    horizontal: Boolean,

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
    canvas() {
      let {width, height, padding, curSpace} = this

      const x0 = padding + curSpace[3]
      const y0 = padding + curSpace[0]

      width = width - x0 - padding - curSpace[1]
      height = height - y0 - padding - curSpace[2]

      return {x0, y0, width, height}
    }
  },

  data() {
    return {
      max: this.maxValue,
      min: this.minValue,
      curSpace: this.space.slice()
    }
  },

  provide() {
    return {
      Artboard: this
    }
  },

  methods: {
    getPoints(values) {
      const {x0, y0, width, height} = this.canvas
      const min = Math.floor(Math.min(...values, this.min))
      const max = Math.ceil(Math.max(...values, this.max))
      const yRatio = height / (max - min)
      const xRatio = width / (values.length - 1)

      this.min = Math.min(min, this.min)
      this.max = Math.max(max, this.max)

      return values.map((value, i) => {
        const y = y0 + height - (value - min) * yRatio
        const x = x0 + xRatio * i
        return [x, y]
      })
    },

    genColor(index) {
      const {colors} = this

      if (isArr(colors)) {
        return colors[index % colors.length]
      }

      return colors(index)
    }
  },

  render(h) {
    const {width, height, space, curSpace} = this
    const slots = this.$slots.default || []

    const charts = []
    const objects = []
    const widgets = []

    slots.forEach(slot => {
      const sealed = slot.componentOptions.Ctor.sealedOptions

      switch (sealed.type) {
        case 'chart':
          slot.index = charts.length
          charts.push(slot)
          break
        case 'object':
          if (sealed.space) {
            sealed.space.forEach((val, i) => {
              const cur = curSpace[i]
              curSpace[i] = isNaN(cur) ? val : Math.max(val, cur)
            })
          }
          objects.push(slot)
          break
        default:
          widgets.push(slot)
          break
      }
    })

    space.forEach((o, i) => {
      if (isFn(o)) {
        curSpace[i] = o(curSpace[i])
      }
    })

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
