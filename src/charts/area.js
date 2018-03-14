import Line from './line'
import area from 'd3-shape/src/area'
import cardinal from 'd3-shape/src/curve/cardinal'
import {extend, isFn, noNilInArray} from '../utils/core'

export default {
  name: 'LaArea',

  mixins: [Line],

  computed: {
    draw() {
      const {curve} = this
      const {canvas} = this.Artboard

      const draw = area()
        .y0(canvas.height + canvas.y0)
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
      const {curPoints, continued} = this

      return continued ? curPoints.filter(noNilInArray) : curPoints
    },

    areaPath() {
      return this.draw(this.areaVailds)
    }
  },

  render(h) {
    const {trans, areaVailds, areaPath, curColor, areaId} = this

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
              d: areaPath,
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
