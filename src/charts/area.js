import Line from './line'
import area from 'd3-shape/src/area'
import cardinal from 'd3-shape/src/curve/cardinal'
import {extend, isFn, noNilInArray, isNil} from '../utils/core'

export default {
  name: 'LaArea',

  mixins: [Line],

  computed: {
    draw() {
      const {curve} = this
      const {canvas} = this.Artboard
      const draw = area()
        .y0(d => canvas.height + canvas.y0 - d[2])
        .defined(noNilInArray)

      if (curve) {
        draw.curve(isFn(curve) ? curve : cardinal)
      }

      return draw
    },

    areaId() {
      return `la-area-${this.id}`
    },

    areaVailds() {
      const {curPoints, continued, id} = this
      const {canvas, stacked, store} = this.Artboard

      if (stacked) {
        if (id === 0) {
          store.lastAreaStack = []
        }

        const height = canvas.height + canvas.y0
        const stack = store.lastAreaStack || []

        curPoints.forEach((point, i) => {
          if (!isNil(point[1])) {
            const p1 = point[1]
            const cur = stack[i] || 0

            point[2] = cur
            point[1] -= cur
            stack[i] = cur + height - p1
          }
        })

        this.Artboard.store.lastAreaStack = stack
      }

      return continued ? curPoints.filter(noNilInArray) : curPoints
    }
  },

  render(h) {
    const {trans, areaVailds, curColor, areaId} = this

    return h('g', [
      h('defs', [
        h(
          'linearGradient',
          {
            attrs: {
              id: areaId
            }
          },
          [
            this.$slots.area ||
              h('stop', {
                attrs: {
                  'stop-color': curColor,
                  'stop-opacity': 0.5
                }
              })
          ]
        )
      ]),
      h(
        Line,
        {
          props: extend(extend({}, this.$props), {
            color: curColor,
            points: areaVailds,
            transition: trans
          }),
          scopedSlots: this.$scopedSlots
        },
        [
          h('path', {
            attrs: {
              d: this.draw(areaVailds),
              fill: `url(#${areaId})`
            },
            style: {
              transition: trans
            }
          }),
          this.$slots.default
        ]
      )
    ])
  }
}
