import Chart from './mixins/chart'
import {getCoordinates} from './utils/point'
import line from 'd3-shape/src/line'
import cardinal from 'd3-shape/src/curve/cardinal'
import {int} from './utils/math'

export default {
  name: 'LaLine',

  mixins: [Chart],

  props: {
    color: String,

    smooth: Boolean,

    dot: Boolean,

    width: {
      type: Number,
      default: 1
    }
  },

  render(h) {
    const dotSlot = this.$scopedSlots.default
    const {x0, y0, x, y} = this.canvas
    const points = getCoordinates(this.values, x0, y0, x, y)
    const l = line()

    this.smooth && l.curve(cardinal)

    return h('g', [
      h('path', {
        attrs: {
          stroke: this.color,
          fill: 'none',
          'stroke-width': this.width,
          d: l(points)
        }
      }),
      h(
        'g',
        dotSlot ?
          points.map((p, i) =>
            dotSlot({
              cx: p[0],
              cy: p[1],
              value: this.values[i],
              index: i
            })
          ) :
          this.dot &&
            points.map(p =>
              h('circle', {
                attrs: {
                  cx: p[0],
                  cy: p[1],
                  r: int(this.width) + 1,
                  stroke: '#fff',
                  fill: this.color
                }
              })
            )
      )
    ])
  }
}
