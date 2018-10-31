import {isArr, isFn, noop, debounce, isNil} from '../utils/core'
import stack from 'd3-shape/src/stack'
import stackOffsetDiverging from 'd3-shape/src/offset/diverging'

export default {
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

    curData() {
      return stack()
        .keys(this.props)
        .offset(this.stacked ? stackOffsetDiverging : noop)(this.data)
    }
  },

  provide() {
    return {
      Plane: this
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
      if (typeof window !== 'undefined') {
        window.addEventListener('resize', debounce(this.resize))
      }
    }
  }
}
