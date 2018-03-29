import chart from './chart'
import {isNil} from '../utils/core'

export default {
  mixins: [chart],

  type: 'cartesian',

  computed: {
    curPoints() {
      if (this.points) {
        return this.points
      }

      const {gap, xRatio, yRatio, low, canvas} = this.Plane
      const {x0, y1} = canvas

      return this.values.map((value, i) => {
        if (isNil(this.raws[i])) {
          return [null]
        }

        let [start, end] = value

        if (start < 0) {
          [end, start] = value
        }

        start = Math.max(low, start)

        const y = isNaN(end) ? null : y1 - (end - low) * yRatio
        const y0 = isNaN(start) ? null : y1 - (start - low) * yRatio
        const x = x0 + xRatio * i + gap

        return [x, y, y0]
      })
    },

    pointSlot() {
      const scoped = this.$scopedSlots.default
      const actived = this.store.activedIndex

      return (
        scoped &&
        this.curPoints.map((p, i) =>
          scoped({
            x: p[0],
            y: p[1],
            value: this.raws[i],
            index: i,
            actived: actived === i,
            color: this.curColor,
            style: {
              transition: this.trans
            }
          })
        )
      )
    }
  }
}
