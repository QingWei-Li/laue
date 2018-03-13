import Line from './line'
import area from 'd3-shape/src/area'
import cardinal from 'd3-shape/src/curve/cardinal'
import {extend, isFn, noNilInArray} from '../utils/core'

export default {
  name: 'LaArea',

  mixins: [Line],

  render(h) {
    const {canvas} = this.Artboard
    const {curve, trans, id, curPoints, curColor, continued} = this
    const draw = area()
      .y0(canvas.height + canvas.y0)
      .defined(noNilInArray)
    const vailds = continued ? curPoints.filter(noNilInArray) : curPoints

    const areaId = `la-area-${id}`

    if (curve) {
      draw.curve(isFn(curve) ? curve : cardinal)
    }

    const path = draw(vailds)

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
            points: vailds,
            transition: trans
          }),
          scopedSlots: this.$scopedSlots
        },
        [
          h('path', {
            attrs: {
              d: path,
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
