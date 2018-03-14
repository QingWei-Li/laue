import {isArr, isFn, isNil} from '../utils/core'
import {maxOrMin} from '../utils/math'

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

    domain: {
      type: Array,
      default: () => []
    },

    /**
     * Top, right, bottom, left
     */
    space: {
      type: Array,
      default: () => []
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
    },

    max() {
      return this.getDomainValue(this.domain[1], 'max')
    },

    min() {
      return this.getDomainValue(this.domain[0], 'min')
    }
  },

  data() {
    return {
      store: {},
      props: []
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
      const valids = values.filter(n => !isNil(n))
      const min = Math.floor(Math.min(...valids, this.min))
      const max = Math.ceil(Math.max(...valids, this.max))
      const yRatio = height / (max - min)
      const xRatio = width / (values.length - 1)

      return values.map((value, i) => {
        const y = isNil(value) ? null : y0 + height - (value - min) * yRatio
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
    },

    getDomainValue(domain, type) {
      if (typeof domain === 'number') {
        return domain
      }
      const val = maxOrMin(this.data, type, this.props)
      if (isFn(domain)) {
        return domain(val)
      }
      return val
    }
  },

  created() {
    // Init data
    this.curSpace = this.space.slice()
  },

  render(h) {
    const {width, height, space, curSpace} = this
    const slots = this.$slots.default || []

    const props = []
    const charts = []
    const objects = []
    const widgets = []

    slots.forEach(slot => {
      const options = slot.componentOptions
      const sealed = options.Ctor.sealedOptions

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
