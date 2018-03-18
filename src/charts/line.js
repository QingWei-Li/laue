import linear from '../mixins/linear'
import line from 'd3-shape/src/line'
import cardinal from 'd3-shape/src/curve/cardinal'
import {int} from '../utils/math'
import {isFn, noNilInArray} from '../utils/core'
import Spread from '../motions/spread'

export default {
  name: 'LaLine',

  mixins: [linear],

  props: {
    curve: [Boolean, Function],

    dot: Boolean,

    width: {
      type: Number,
      default: 1
    },

    hideLine: Boolean,

    dashed: {
      type: String,
      default: 'none'
    },

    /**
     * @summary Like connectNulls
     */
    continued: Boolean
  },

  computed: {
    draw() {
      const {curve, continued} = this
      const draw = line().defined(noNilInArray)

      if (curve) {
        draw.curve(isFn(curve) ? curve : cardinal)
      }

      return p => {
        p = continued ? p.filter(noNilInArray) : p
        return draw(p)
      }
    },

    valueSlot() {
      const h = this.$createElement

      return (
        this.showValue &&
        h(
          'g',
          {
            attrs: {
              fill: this.curColor
            }
          },
          this.curPoints.map((point, i) => {
            return h(
              'text',
              {
                attrs: {
                  x: point[0],
                  y: point[1],
                  dy: '-0.31em',
                  'text-anchor': 'middle'
                }
              },
              this.raws[i]
            )
          })
        )
      )
    }
  },

  render(h) {
    const {
      animated,
      width,
      curPoints,
      curColor,
      hideLine,
      dashed,
      trans,
      valueSlot,
      pointSlot
    } = this
    const graphs = [
      !hideLine &&
        h('path', {
          attrs: {
            stroke: curColor,
            fill: 'none',
            'stroke-width': width,
            d: this.draw(curPoints)
          },
          style: {
            'stroke-dasharray': dashed || 3,
            transition: trans
          }
        }),
      this.$slots.default,
      this.dot &&
        h(
          'g',
          {
            attrs: {
              stroke: '#fff',
              fill: curColor
            }
          },
          curPoints.map(p =>
            h('circle', {
              attrs: {
                cx: p[0],
                cy: p[1],
                r: int(width) + 1
              },
              style: {
                transition: trans
              }
            })
          )
        ),
      valueSlot,
      pointSlot
    ]

    if (animated) {
      return h(
        Spread,
        {
          props: {
            axis: 'x',
            transition: trans
          }
        },
        graphs
      )
    }

    return h('g', graphs)
  }
}
