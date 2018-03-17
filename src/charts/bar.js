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
      const {id, width} = this
      const {snap, distance, stacked} = this.Artboard
      const index = snap.barMap.indexOf(id)

      return stacked ?
        -width / 2 :
        snap.barOffset[index] - (snap.barAllWidth - distance) / 2
    }
  },

  render(h) {
    const {
      width,
      curPoints,
      curColor,
      margin,
      animated,
      trans,
      pointSlot,
      valueSlot
    } = this

    let rects = curPoints.map(point => {
      const height = point[2] - point[1]

      return h('rect', {
        attrs: {
          x: point[0] + margin,
          y: height < 0 ? point[2] : point[1],
          width: width,
          height: Math.abs(height)
        }
      })
    })

    if (animated) {
      rects = curPoints.map(point => {
        const height = point[2] - point[1]

        return h(
          Trans,
          {
            props: {
              to: {
                height: Math.abs(height),
                y: height < 0 ? point[2] : point[1]
              }
            }
          },
          [
            h('rect', {
              attrs: {
                x: point[0] + margin,
                y: point[2],
                width: width,
                height: 0
              },
              style: {
                transition: trans
              }
            })
          ]
        )
      })
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
