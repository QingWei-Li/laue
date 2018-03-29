import Line from './line'
import area from 'd3-shape/src/area'
import cardinal from 'd3-shape/src/curve/cardinal'
import {extend, isFn, noNilInArray} from '../utils/core'

export default {
  name: 'LaArea',

  mixins: [Line],

  props: {
    fillColor: String
  },

  computed: {
    draw() {
      const {curve, continued} = this
      const draw = area()
        .y0(d => d[2])
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
      return `la-area-${this._uid}-${this.id}`
    },

    curFillColor() {
      return this.fillColor || `url(#${this.areaId})`
    }
  },

  render(h) {
    const {trans, curPoints, curColor, curFillColor, actived} = this

    if (!actived) {
      return null
    }

    return h('g', [
      !this.fillColor &&
        h('defs', [
          h(
            'linearGradient',
            {
              // I don't kown why using `attrs` causes the client not to rerender if the server has already rendered.
              domProps: {
                id: this.areaId
              }
            },
            [
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
              fill: curFillColor
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
