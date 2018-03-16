import values from './values'
import {isNil} from '../utils/core'

export default {
  mixins: [values],

  type: 'chart',

  props: {
    animated: Boolean,

    animationDuration: {
      default: 1,
      type: Number
    },

    animationEffect: {
      default: 'ease',
      type: String
    },

    transition: String,

    points: Array,

    color: String
  },

  computed: {
    id() {
      return this.$vnode.index
    },

    trans() {
      return (
        this.transition ||
        (this.animated ?
          `all ${this.animationDuration}s ${this.animationEffect}` :
          '')
      )
    },

    curPoints() {
      if (this.points) {
        return this.points
      }

      const {canvas, stacked, snap, getPoints} = this.Artboard
      const points = getPoints(this.values)

      if (stacked) {
        const stack = snap.lastStack || []

        points.forEach((point, i) => {
          if (!isNil(point[1])) {
            const p1 = point[1]
            const cur = stack[i] || 0

            point[2] = cur
            point[1] -= cur
            stack[i] = cur + canvas.y1 - p1
          }
        })

        snap.lastStack = stack
      }

      return points
    },

    curColor() {
      return this.color || this.Artboard.genColor(this.id)
    }
  }
}
