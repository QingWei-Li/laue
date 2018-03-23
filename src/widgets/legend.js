import widget from '../mixins/widget'
import {extend} from '../utils/core'

export default {
  name: 'LaLegend',

  mixins: [widget],

  props: {
    selectable: Boolean,

    /**
     * ^(top|bottom|left|right)(-(start|center|end))?$
     */
    placement: {
      type: String,
      default: 'bottom'
    },

    color: String
  },

  preload({data, parent}) {
    const {placement = 'bottom'} = data
    let space = [0, 0, 0, 0]

    switch (placement.match(/^(\w+)-?/)[1]) {
      case 'bottom':
        space[2] = 50
        break
      case 'top':
        space[0] = 50
        break
      case 'left':
        space[3] = 100
        break
      case 'right':
        space[1] = 100
        break
      default:
        break
    }

    parent.addSpace(space)
  },

  computed: {
    curColor() {
      return this.color || this.Artboard.textColor
    },

    position() {
      return this.placement.match(/^(\w+)(-(\w+))?$/)[1]
    },

    align() {
      return this.placement.match(/^(\w+)(-(\w+))?$/)[3]
    },

    pos() {
      const {position, align} = this
      const pos = {}

      if (position === 'top' || position === 'bottom') {
        switch (align) {
          case 'start':
            pos.left = 0
            break
          case 'end':
            pos.right = 0
            break
          default:
            pos.left = '50%'
            pos.transform = 'translateX(-50%)'
            break
        }
        if (position === 'top') {
          pos.top = 0
        } else {
          pos.bottom = 0
        }
      } else {
        switch (align) {
          case 'start':
            pos.top = 0
            break
          case 'end':
            pos.bottom = 0
            break
          default:
            pos.top = '50%'
            pos.transform = 'translateY(-50%)'
            break
        }
        if (position === 'left') {
          pos.left = 0
        } else {
          pos.right = 0
        }
      }

      return pos
    }
  },

  render(h) {
    const {props, store} = this.Artboard
    const {curColor, pos, position} = this

    return h(
      'div',
      {
        class: 'la-legend',
        style: extend(
          {
            position: 'absolute'
          },
          pos
        )
      },
      props.map(prop =>
        h(
          'div',
          {
            style: {
              display:
                position === 'left' || position === 'right' ?
                  'block' :
                  'inline-block',
              marginRight: '10px',
              marginLeft: '5px',
              color: curColor
            }
          },
          [
            h('span', {
              style: {
                backgroundColor: store.colors[prop],
                height: '10px',
                width: '10px',
                borderRadius: '50%',
                display: 'inline-block',
                marginRight: '5px'
              }
            }),
            h('span', store.labels[prop])
          ]
        )
      )
    )
  }
}
