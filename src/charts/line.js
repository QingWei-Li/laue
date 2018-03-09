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
    color: String,

    curve: [Boolean, Function],

    dot: Boolean,

    width: {
      type: Number,
      default: 1
    },

    points: Array
  },

  render(h) {
    const {curve, animated, values, width, color} = this
    const pointSlot = this.$scopedSlots.default
    const points = this.points || this.Artboard.getPoints(values)
    const l = line()
    const style = {}

    if (curve) {
      l.curve(isFn(curve) ? curve : cardinal)
    }
    if (animated) {
      style.transition = `all ${this.animationDuration}s ${
        this.animationEffect
      }`
    }

    const path = l(points)
    const graphs = [
      h('path', {
        attrs: {
          stroke: color,
          fill: 'none',
          'stroke-width': width,
          d: path
        },
        style
      }),
      this.dot &&
        h(
          'g',
          points.map(p =>
            h('circle', {
              attrs: {
                cx: p[0],
                cy: p[1],
                r: int(width) + 1,
                stroke: '#fff',
                fill: color
              },
              style
            })
          )
        ),
      pointSlot &&
        h(
          'g',
          points.map((p, i) =>
            pointSlot({
              x: p[0],
              y: p[1],
              value: values[i],
              index: i
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
            transition: style.transition
          }
        },
        graphs
      )
    }

    return h('g', graphs)
  }
}
