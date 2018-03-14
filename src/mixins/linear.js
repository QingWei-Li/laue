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

      const {canvas, stacked, store, getPoints} = this.Artboard
      const points = getPoints(this.values)

      if (stacked) {
        if (this.id === 0) {
          store.lastStack = []
        }

        const height = canvas.height + canvas.y0
        const stack = store.lastStack || []

        points.forEach((point, i) => {
          if (!isNil(point[1])) {
            const p1 = point[1]
            const cur = stack[i] || 0

            point[2] = cur
            point[1] -= cur
            stack[i] = cur + height - p1
          }
        })

        store.lastStack = stack
      }

      return points
    },

    curColor() {
      return this.color || this.Artboard.genColor(this.id)
    }
  }
}
