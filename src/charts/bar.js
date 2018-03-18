import linear from '../mixins/linear'
import Trans from '../motions/trans'

const DEFAULT_WIDTH = 20

export default {
  name: 'LaBar',

  mixins: [linear],

  props: {
    width: {
      type: Number,
      default: DEFAULT_WIDTH
    }
  },

  preload({data, parent, index}) {
    const {snap, distance} = parent
    const width = data.width || DEFAULT_WIDTH

    snap.barMap = [].concat(snap.barMap, index)
    snap.barAllWidth = snap.barAllWidth || 0
    snap.barOffset = [].concat(snap.barOffset, snap.barAllWidth)
    snap.barAllWidth += width + distance
  },

  computed: {
    margin() {
      const {id, width} = this
      const {snap, distance, stacked} = this.Artboard
      const index = snap.barMap.indexOf(id)

      return stacked ?
        -width / 2 :
        snap.barOffset[index] - (snap.barAllWidth - distance) / 2
    },

    valueSlot() {
      const h = this.$createElement

      return (
        this.showValue &&
        h(
          'g',
          {
            attrs: {
              fill: '#fff'
            }
          },
          this.curPoints.map((point, i) => {
            return h(
              'text',
              {
                attrs: {
                  x: point[0] + this.margin + this.width / 2,
                  y: point[2] + (point[1] - point[2]) / 2,
                  dy: '0.31em',
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

  methods: {
    getRect(point) {
      const height = point[2] - point[1]

      return this.$createElement('rect', {
        attrs: {
          x: point[0] + this.margin,
          y: height < 0 ? point[2] : point[1],
          width: this.width,
          height: Math.abs(height)
        }
      })
    }
  },

  render(h) {
    const {curPoints, curColor, animated, trans, pointSlot, valueSlot} = this

    let rects = []

    if (animated) {
      rects = curPoints.map(point => {
        return h(
          Trans,
          {
            props: {
              from: {
                height: 0,
                y: this.Artboard.canvas.y1
              },
              trans
            }
          },
          [this.getRect(point)]
        )
      })
    } else {
      rects = curPoints.map(this.getRect)
    }

    return h(
      'g',
      {
        attrs: {
          fill: curColor
        }
      },
      [].concat(rects, valueSlot, pointSlot)
    )
  }
}
