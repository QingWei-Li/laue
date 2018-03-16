import linear from '../mixins/linear'
import Trans from '../motions/trans'

const DEFAULT_WIDTH = 20

export default {
  name: 'LaBar',

  mixins: [linear],

  props: {
    width: {
      default: DEFAULT_WIDTH,
      type: Number
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
      const {id} = this
      const {snap, distance} = this.Artboard
      const index = snap.barMap.indexOf(id)

      return snap.barOffset[index] - (snap.barAllWidth - distance) / 2
    }
  },

  render(h) {
    const {canvas} = this.Artboard
    const {width, curPoints, curColor, margin, animated, trans} = this

    let rects = curPoints.map(point => {
      return h('rect', {
        attrs: {
          x: point[0] + margin,
          y: point[1],
          width: width,
          height: canvas.y1 - point[1],
          fill: curColor
        }
      })
    })

    if (animated) {
      rects = curPoints.map(point => {
        return h(
          Trans,
          {
            props: {
              to: {
                height: canvas.y1 - point[1],
                y: point[1]
              }
            }
          },
          [
            h('rect', {
              attrs: {
                x: point[0] + margin,
                y: canvas.y1,
                width: width,
                height: 0,
                fill: curColor
              },
              style: {
                transition: trans
              }
            })
          ]
        )
      })
    }

    return h('g', rects)
  }
}
