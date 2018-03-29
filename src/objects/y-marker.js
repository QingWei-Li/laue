import object from '../mixins/object'
import dashed from '../mixins/dashed'

export default {
  name: 'LaYMarker',

  mixins: [object, dashed],

  props: {
    label: String,

    value: Number,

    placement: {
      type: String,
      default: 'end'
    }
  },

  computed: {
    point() {
      const {yRatio, low, canvas} = this.Plane
      const {x0, y1, x1} = canvas
      const y = y1 - (this.value - low) * yRatio

      return {x1: x0, y1: y, y2: y, x2: x1}
    }
  },

  render(h) {
    const {point, curColor, curDashed, label, placement} = this

    return h(
      'g',

      [
        h('line', {
          attrs: point,
          style: {
            stroke: curColor,
            'stroke-dasharray': curDashed
          }
        }),
        label &&
          h(
            'text',
            {
              attrs: {
                fill: curColor,
                x:
                  placement === 'end' ?
                    point.x2 :
                    placement === 'start' ?
                      point.x1 :
                      (point.x2 - point.x1) / 2 + point.x1,
                y: point.y1,
                dy: '-0.31em',
                'text-anchor': placement
              }
            },
            label
          )
      ]
    )
  }
}
