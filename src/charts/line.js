import cartesian from '../mixins/cartesian'
import line from 'd3-shape/src/line'
import cardinal from 'd3-shape/src/curve/cardinal'
import {int} from '../utils/math'
import {isFn, noNilInArray} from '../utils/core'
import Spread from '../motions/spread'
import dashed from '../mixins/dashed'

export default {
  name: 'LaLine',

  mixins: [cartesian, dashed],

  props: {
    curve: [Boolean, Function],

    dot: Boolean,

    width: {
      type: Number,
      default: 1
    },

    hideLine: Boolean,

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
      trans,
      valueSlot,
      pointSlot,
      store,
      actived
    } = this

    if (!actived) {
      return null
    }

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
            'stroke-dasharray': this.curDashed,
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
          curPoints.map(
            (p, index) =>
              p[1] &&
              h('circle', {
                attrs: {
                  cx: p[0],
                  cy: p[1],
                  r: (index === store.activedIndex ? 2 : 0) + int(width) + 1
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
