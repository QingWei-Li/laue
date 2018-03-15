import values from './values'
import {genTicks} from '../utils/math'
import {isFn} from '../utils/core'

const CAP_HEIGHT = 0.71

export default {
  props: {
    name: String,

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

    format: Function
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
        values = genTicks(board.min, board.max, length)
      }

      return values
    },

    points() {
      const {Artboard: board, isX, labels, inverse} = this
      const {x0, y0, width, height} = board.canvas
      let points

      if (isX) {
        const xRatio = board.xRatio
        const offset = inverse ? 0 : height

        points = labels.map((value, i) => {
          const x = x0 + xRatio * i
          const y = y0 + offset

          return [x, y]
        })
      } else {
        const {min, max} = board
        const yRatio = height / (max - min)
        const offset = inverse ? width : 0

        points = labels.map(value => {
          const x = x0 + offset
          const y = y0 + height - (value - min) * yRatio

          return [x, y]
        })
      }

      return points
    }
  },

  render(h) {
    const {
      points,
      labels,
      tickSize,
      fontSize,
      color,
      isX,
      format,
      inverse
    } = this
    const first = points[0]
    const end = points[points.length - 1]
    const tspanSlot = this.$scopedSlots.default

    const lineSize = (inverse ? -1 : 1) * tickSize
    const yLineOffset = (isX ? 1 : 0) * lineSize
    const xLineOffset = (isX ? 0 : 1) * lineSize
    const textAlign = isX ? 'middle' : inverse ? 'start' : 'end'
    const spanYOffset = isX ?
      inverse ? CAP_HEIGHT - 1 : CAP_HEIGHT :
      CAP_HEIGHT / 2
    const textYOffset = (isX ? lineSize : 0) * 1.5
    const textXOffset = (isX ? 0 : lineSize) * 1.5

    const ticks = labels.map((value, i) => {
      const point = points[i]

      return h('g', [
        tickSize &&
          h('line', {
            attrs: {
              x1: point[0] - xLineOffset,
              x2: point[0],
              y1: point[1] + yLineOffset,
              y2: point[1],
              stroke: color
            }
          }),
        h(
          'text',
          {
            attrs: {
              x: point[0] - textXOffset,
              y: point[1] + textYOffset,
              dy: spanYOffset + 'em',
              stroke: 'none'
            }
          },
          tspanSlot ? tspanSlot({value}) : isFn(format) ? format(value) : value
        )
      ])
    })

    return h('g', [
      h('line', {
        attrs: {
          x2: end[0],
          y2: end[1],
          x1: first[0],
          y1: first[1],
          stroke: color
        }
      }),
      h(
        'g',
        {
          attrs: {
            'text-anchor': textAlign,
            'font-size': fontSize,
            fill: color
          }
        },
        ticks
      )
    ])
  }
}
