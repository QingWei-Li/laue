import polar from '../mixins/polar'
import pie from 'd3-shape/src/pie'
import arc from 'd3-shape/src/arc'
import {noop, isArr} from '../utils/core'
import Circle from '../motions/circle'

export default {
  name: 'LaPie',

  mixins: [polar],

  props: {
    translate: {
      type: [String, Array],
      default: () => ['50%', '50%']
    },

    radius: {
      type: [Number, Array],
      default: () => [0, 100]
    },

    angles: {
      type: [Number, Array],
      default: () => [0, Math.PI * 2]
    },

    showLabel: Boolean,

    labelProp: {
      type: String,
      default: 'label'
    }
  },

  computed: {
    arcs() {
      return pie()
        .startAngle(this.curAngles[0])
        .endAngle(this.curAngles[1])
        .sortValues(noop)(this.raws)
    },

    curRadius() {
      let innerRadius = isArr(this.radius) ? this.radius[0] : 0
      let outerRadius = isArr(this.radius) ? this.radius[1] : 100

      if (this.min && this.$parent.fillContainer) {
        outerRadius = this.min / 2

        if (this.showLabel) {
          outerRadius -= this.min / 4
        }
      }

      return [innerRadius, outerRadius]
    },

    curAngles() {
      const {angles} = this

      return isArr(angles) ? angles : [0, angles]
    },

    draw() {
      return arc()
        .innerRadius(this.curRadius[0])
        .outerRadius(this.curRadius[1])
    },

    drawText() {
      return arc()
        .innerRadius((this.$parent.fillContainer ? 0 : this.curRadius[1]) * 0.7)
        .outerRadius((this.$parent.fillContainer ? this.min : this.curRadius[1]) * 0.7)
    },

    drawTextLabels() {
      const innerRadius = this.$parent.fillContainer ? (this.radius[0] + this.min / 5) : this.curRadius[1] * 0.7
      const outerRadius = this.$parent.fillContainer ? (this.radius[0] + this.min / 5) : this.curRadius[1] * 0.7

      return arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
    },

    min() {
      return this.$parent.min
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
    },

    labels() {
      const {labelProp, Plane} = this

      return labelProp ? Plane.data.map(o => o[labelProp]) : null
    },

    labelSlot() {
      if (!this.showLabel) {
        return
      }

      const h = this.$createElement

      return this.arcs.map((arc, i) => {
        const point = this.drawTextLabels.centroid(arc)

        return h(
          'text',
          {
            attrs: {
              x: (point[0] * 0.95) << 1,
              y: (point[1] * 0.95) << 1,
              fill: '#000',
              'text-anchor': 'middle'
            }
          },
          this.labels[i]
        )
      })
    }
  },

  render(h) {
    const {genColor} = this.Plane
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
    const nodes = [].concat(paths, this.valueSlot, this.labelSlot, pointSlot)

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
