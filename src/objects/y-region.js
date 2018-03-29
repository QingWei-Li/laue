import object from '../mixins/object'
import {extend} from '../utils/core'
import dashed from '../mixins/dashed'

export default {
  name: 'LaYRegion',

  mixins: [object, dashed],

  props: {
    label: String,

    low: {
      type: Number,
      required: true
    },

    high: {
      type: Number,
      required: true
    },

    fillColor: String,

    placement: {
      type: String,
      default: 'end'
    }
  },

  computed: {
    point() {
      const {yRatio, low, canvas} = this.Plane
      const {x0, y1, width} = canvas

      return {
        x: x0,
        y: y1 - (this.high - low) * yRatio,
        height: (this.high - this.low) * yRatio,
        width: width
      }
    },

    fillAttr() {
      const {fillColor} = this

      return fillColor ?
        {
          fill: fillColor,
          stroke: this.curColor
        } :
        {
          stroke: this.curColor,
          opacity: 0.3
        }
    }
  },

  render(h) {
    const {label, point, placement, fillAttr} = this

    if (this.high < this.low) {
      return
    }

    return h(
      'g',
      {
        attrs: {
          fill: this.curColor
        }
      },
      [
        h('rect', {
          attrs: extend(fillAttr, point),
          style: {
            'stroke-dasharray': this.curDashed
          }
        }),
        label &&
          h(
            'text',
            {
              attrs: {
                x:
                  placement === 'end' ?
                    point.x + point.width :
                    placement === 'start' ?
                      point.x :
                      point.width / 2 + point.x,
                y: point.y,
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
