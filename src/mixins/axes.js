import values from './values'
import {genTicks} from '../utils/math'
import {isFn, isNil} from '../utils/core'

function getDomainValue(domain, val) {
  return isFn(domain) ? domain(val) : isNil(domain) ? val : domain
}

export default {
  props: {
    name: String,

    unit: String,

    /**
     * @example [0, 2000]
     * @example [v => v - 1000, v => v + 1000]
     * @example [null, 20]
     */
    domain: {
      type: Array,
      default: () => []
    },

    color: {
      type: String,
      default: '#999'
    },

    tickSize: {
      type: Number,
      default: 5
    },

    fontSize: {
      type: Number,
      default: 15
    },
  },

  type: 'object',

  mixins: [values],

  computed: {
    isX() {
      return this.$options.axis === 'x'
    },

    labels() {
      let values = this.values
      const board = this.Artboard
      const length = board.data.length

      if (this.isX) {
        values = values || Array.apply(null, {length}).map((n, i) => i)
      } else {
        const min = getDomainValue(this.domain[0], board.min)
        const max = getDomainValue(this.domain[1], board.max)

        values = genTicks(min, max, length)
        board.min = values[0]
        board.max = values[values.length - 1]
      }

      if (this.unit) {
        values = values.map(v => v + this.unit)
      }

      return values
    },

    points() {
      const {Artboard: board, isX, labels} = this
      const {x0, y0, width, height} = board.canvas

      let points

      if (isX) {
        const xRatio = width / (labels.length - 1)

        points = labels.map((value, i) => {
          const x = x0 + xRatio * i
          const y = y0 + height

          return [x, y]
        })
      } else {
        const {min, max} = board
        const yRatio = height / (max - min)

        points = labels.map(value => {
          const x = x0
          const y = y0 + height - (value - min) * yRatio

          return [x, y]
        })
      }

      return points
    }
  }
}
