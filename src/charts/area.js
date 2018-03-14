import Line from './line'
import area from 'd3-shape/src/area'
import cardinal from 'd3-shape/src/curve/cardinal'
import {extend, isFn, noNilInArray} from '../utils/core'

export default {
  name: 'LaArea',

  mixins: [Line],

  computed: {
    draw() {
      const {curve, continued} = this
      const {canvas} = this.Artboard
      const draw = area()
        .y0(d => canvas.height + canvas.y0 - (d[2] || 0))
        .defined(noNilInArray)

      if (curve) {
        draw.curve(isFn(curve) ? curve : cardinal)
      }

      return p => {
        p = continued ? p.filter(noNilInArray) : p
        return draw(p)
      }
    },

    areaId() {
      return `la-area-${this.id}`
    }
  },

  render(h) {
    const {trans, curPoints, curColor, areaId} = this

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
            points: curPoints,
            transition: trans
          }),
          scopedSlots: this.$scopedSlots
        },
        [
          h('path', {
            attrs: {
              d: this.draw(curPoints),
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
