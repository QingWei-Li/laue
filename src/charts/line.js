import Chart from '../mixins/chart'
import line from 'd3-shape/src/line'
import cardinal from 'd3-shape/src/curve/cardinal'
import {int} from '../utils/math'
import {isFn, noNilInArray} from '../utils/core'
import Mask from '../motions/mask'

export default {
  name: 'LaLine',

  mixins: [Chart],

  props: {
    curve: [Boolean, Function],

    dot: Boolean,

    width: {
      type: Number,
      default: 1
    },

    transition: String,

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

  render(h) {
    const {
      curve,
      animated,
      values,
      width,
      curPoints,
      curColor,
      hideLine,
      dashed,
      continued
    } = this
    const pointSlot = this.$scopedSlots.default
    const draw = line().defined(noNilInArray)
    const vailds = continued ? curPoints.filter(noNilInArray) : curPoints

    if (curve) {
      draw.curve(isFn(curve) ? curve : cardinal)
    }

    const path = draw(vailds)
    const graphs = [
      !hideLine &&
        h('path', {
          attrs: {
            stroke: curColor,
            fill: 'none',
            'stroke-width': width,
            d: path
          },
          style: {
            'stroke-dasharray': dashed || 3,
            transition: this.trans
          }
        }),
      this.$slots.default,
      this.dot &&
        h(
          'g',
          curPoints.map(p =>
            h('circle', {
              attrs: {
                cx: p[0],
                cy: p[1],
                r: int(width) + 1,
                stroke: '#fff',
                fill: curColor
              },
              style: {
                transition: this.trans
              }
            })
          )
        ),
      pointSlot &&
        h(
          'g',
          curPoints.map((p, i) =>
            pointSlot({
              x: p[0],
              y: p[1],
              value: values[i],
              index: i,
              style: {
                transition: this.trans
              }
            })
          )
        )
    ]

    if (animated) {
      return h(
        Mask,
        {
          props: {
            axis: 'x',
            transition: this.trans
          }
        },
        graphs
      )
    }

    return h('g', graphs)
  }
}
