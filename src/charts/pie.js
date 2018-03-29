import chart from '../mixins/chart'
import pie from 'd3-shape/src/pie'
import arc from 'd3-shape/src/arc'
import {noop, isArr} from '../utils/core'
import Circle from '../motions/circle'

export default {
  name: 'LaPie',

  mixins: [chart],

  props: {
    translate: {
      type: [String, Array],
      default: () => ['50%', '50%']
    },

    radius: {
      type: [Number, Array],
      default: () => [0, 100]
    }
  },

  computed: {
    arcs() {
      return pie().sortValues(noop)(this.raws)
    },

    curRadius() {
      const {radius} = this

      return isArr(radius) ? radius : [0, radius]
    },

    draw() {
      return arc()
        .innerRadius(this.curRadius[0])
        .outerRadius(this.curRadius[1])
    },

    drawText() {
      return arc()
        .innerRadius(this.curRadius[1] * 0.7)
        .outerRadius(this.curRadius[1] * 0.7)
    },

    valueSlot() {
      if (!this.showValue) {
        return
      }
      const h = this.$createElement

      return this.arcs.map((arc, i) => {
        const point = this.drawText.centroid(arc)

        return h(
          'text',
          {
            attrs: {
              x: point[0],
              y: point[1],
              fill: '#fff',
              'text-anchor': 'middle'
            }
          },
          this.raws[i]
        )
      })
    }
  },

  render(h) {
    const {genColor} = this.Cartesian
    const {animated, arcs, draw} = this
    const paths = arcs.map(draw).map((d, i) => {
      return h('path', {
        attrs: {
          d,
          fill: genColor(i),
          stroke: '#fff'
        }
      })
    })
    const scoped = this.$scopedSlots.default
    const pointSlot =
      scoped &&
      arcs.map((arc, i) => {
        const point = this.drawText.centroid(arc)
        return scoped({
          arc,
          index: i,
          x: point[0],
          y: point[1],
          style: {
            transition: this.trans
          }
        })
      })
    const nodes = [].concat(paths, this.valueSlot, pointSlot)

    const data = {
      style: {
        transform: `translate(${this.translate})`
      }
    }

    if (animated) {
      return h('g', data, [
        h(
          Circle,
          {
            props: {
              transition: this.trans,
              r: this.curRadius[1]
            }
          },
          nodes
        )
      ])
    }

    return h('g', data, nodes)
  }
}
