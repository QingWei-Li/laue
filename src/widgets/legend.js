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
      return this.color || this.Plane.textColor
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

  created() {
    this.$set(this.store, 'hidden', [])
  },

  render(h) {
    const {curColor, pos, position, selectable, store} = this
    const {hidden} = store
    const slot = this.$scopedSlots.default

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
      Object.keys(store.props).map(id =>
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
              color: curColor,
              cursor: selectable ? 'pointer' : 'nromal'
            },
            on: {
              click: () => {
                if (!selectable) {
                  return
                }
                id = Number(id)
                const index = hidden.indexOf(id)

                if (index < 0) {
                  hidden.push(id)
                } else {
                  hidden.splice(index, 1)
                }
              }
            }
          },
          slot ?
            slot({
              color: store.colors[id],
              label: store.labels[id],
              prop: store.props[id]
            }) :
            [
              h('span', {
                style: {
                  backgroundColor: store.colors[id],
                  height: '10px',
                  width: '10px',
                  borderRadius: '50%',
                  display: 'inline-block',
                  marginRight: '5px'
                }
              }),
              h(
                'span',
                {
                  style:
                      hidden.indexOf(Number(id)) > -1 ?
                        {
                          textDecoration: 'line-through'
                        } :
                        {}
                },
                store.labels[id]
              )
            ]
        )
      )
    )
  }
}
