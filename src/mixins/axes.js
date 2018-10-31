import values from './values'
import {genTicks, genExactNbTicks} from '../utils/math'
import {isFn} from '../utils/core'
import object from './object'
import dashed from './dashed'

const CAP_HEIGHT = 0.71

export default {
  props: {
    color: String,

    tickSize: {
      type: Number,
      default: 5
    },

    fontSize: {
      type: Number,
      default: 15
    },

    format: Function,

    gridline: Boolean,

    gridlineInterval: [Function, Number],

    interval: [Function, Number],

    ticks: Array,

    nbTicks: Number
  },

  mixins: [object, values, dashed],

  computed: {
    isX() {
      return this.$options.axis === 'x'
    },

    labels() {
      let raws = this.raws
      const board = this.Plane
      const length = board.len

      if (this.isX) {
        raws = raws || Array.apply(null, {length}).map((n, i) => i + 1)
      } else {
        raws = genTicks(board.low, board.high, length)
      }

      return raws
    },

    gap() {
      return this.isX ? this.Plane.gap : 0
    },

    points() {
      const {Plane: board, isX, labels, inverse, gap} = this
      const {x0, y0, y1, width, height} = board.canvas
      let points

      if (isX) {
        const {xRatio} = board
        const offset = inverse ? 0 : height
        const y = y0 + offset

        points = labels.map((value, i) => {
          const x = x0 + xRatio * i + gap

          return [x, y]
        })
      } else {
        const {yRatio, low} = board
        const offset = inverse ? width : 0
        const x = x0 + offset

        points = labels.map(value => {
          const y = y1 - (value - low) * yRatio

          return [x, y]
        })
      }

      return points
    },

    curColor() {
      return this.color || this.Plane.textColor
    },

    handleInterval() {
      const {interval} = this

      if (typeof interval === 'number') {
        return function (i) {
          return i % interval === 0
        }
      }

      if (isFn(interval)) {
        return interval
      }
    },

    handleGridlineInterval() {
      const {gridlineInterval} = this

      if (typeof gridlineInterval === 'number') {
        return function (i) {
          return i % gridlineInterval === 0
        }
      }

      if (isFn(gridlineInterval)) {
        return gridlineInterval
      }
    }
  },

  watch: {
    'store.activedIndex'(index) {
      if (this.isX) {
        this.$set(this.store, 'activedLabel', this.labels[index])
      }
    }
  },

  render(h) {
    let {ticks} = this

    const {
      nbTicks,
      points,
      labels,
      tickSize,
      fontSize,
      curColor,
      isX,
      format,
      inverse,
      gap,
      Plane: board,
      store
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

    if (ticks || nbTicks) {
      const yBasis = board.height - board.offset[2]

      if (nbTicks) {
        ticks = genExactNbTicks(board.low, board.high, nbTicks)
      }

      ticks = ticks.map(value => {
        return h('g', [
          tickSize &&
            h('line', {
              attrs: {
                x1: 0 - xLineOffset + board.offset[3],
                x2: 6 - xLineOffset + board.offset[3],
                y1: yBasis - value * board.yRatio,
                y2: yBasis - value * board.yRatio - yLineOffset,
                stroke: curColor
              }
            }),
          h(
            'text',
            {
              attrs: {
                x: 0 - textXOffset + board.offset[3],
                y:
                  board.height -
                  board.offset[2] -
                  value * board.yRatio -
                  textYOffset,
                dy: spanYOffset + 'em',
                stroke: 'none'
              }
            },
            tspanSlot ?
              tspanSlot({value}) :
              isFn(format) ? format(value) : value
          )
        ])
      })
    } else {
      ticks = labels
        .map((value, i) => {
          const point = points[i]

          if (this.handleInterval && !this.handleInterval(i)) {
            return false
          }

          return h('g', [
            tickSize &&
              h('line', {
                attrs: {
                  x1: point[0] - xLineOffset,
                  x2: point[0],
                  y1: point[1] + yLineOffset,
                  y2: point[1],
                  stroke: curColor
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
              tspanSlot ?
                tspanSlot({value}) :
                isFn(format) ? format(value) : value
            )
          ])
        })
        .filter(Boolean)
    }

    return h(
      'g',
      {
        attrs: {
          stroke: curColor
        }
      },
      [
        h('line', {
          attrs: {
            x2: end[0] + gap,
            y2: end[1],
            x1: first[0] - gap,
            y1: first[1]
          }
        }),
        [
          h(
            'g',
            {
              attrs: {
                'text-anchor': textAlign,
                'font-size': fontSize,
                fill: curColor,
                stroke: 'none'
              }
            },
            ticks
          )
        ].concat(
          this.gridline &&
            points.reduce((all, p, i) => {
              if (
                !this.handleGridlineInterval ||
                this.handleGridlineInterval(i)
              ) {
                all.push(
                  h('line', {
                    attrs: {
                      x1: p[0],
                      y1: p[1],
                      x2: isX ? p[0] : board.canvas.x1,
                      y2: isX ? board.canvas.y0 : p[1]
                    },
                    style: {
                      opacity: isX && store.activedIndex === i ? 1 : 0.3,
                      'stroke-dasharray': this.curDashed
                    }
                  })
                )
              }
              return all
            }, [])
        )
      ]
    )
  }
}
