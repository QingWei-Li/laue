import Line from './line'
import area from 'd3-shape/src/area'
import {extend, isFn} from '../utils/core'
import cardinal from 'd3-shape/src/curve/cardinal'

export default {
  name: 'LaArea',

  mixins: [Line],

  render(h) {
    const {getPoints, canvas} = this.Artboard
    const {curve, trans, color, id} = this
    const points = getPoints(this.values)
    const draw = area().y0(canvas.height + canvas.y0)
    const areaId = `la-area-${id}`

    if (curve) {
      draw.curve(isFn(curve) ? curve : cardinal)
    }

    const path = draw(points)

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
                  'stop-color': color,
                  'stop-opacity': 0.5
                }
              })
          ]
        )
      ]),
      h(
        Line,
        {
          props: extend(
            {
              points,
              transition: trans
            },
            this.$props
          ),
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
