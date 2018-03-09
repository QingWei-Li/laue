import Chart from '../mixins/chart'
import line from 'd3-shape/src/line'
import cardinal from 'd3-shape/src/curve/cardinal'
import {int} from '../utils/math'
import {isFn} from '../utils/core'
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

    transition: String
  },

  render(h) {
    const {curve, animated, values, width, curPoints, curColor} = this
    const pointSlot = this.$scopedSlots.default
    const draw = line()

    if (curve) {
      draw.curve(isFn(curve) ? curve : cardinal)
    }

    const path = draw(curPoints)
    const graphs = [
      h('path', {
        attrs: {
          stroke: curColor,
          fill: 'none',
          'stroke-width': width,
          d: path
        },
        style: {
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
