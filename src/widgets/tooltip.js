import widget from '../mixins/widget'
import {debounce} from '../utils/core'
import animate from '../mixins/animate'

export default {
  name: 'LaTooltip',

  mixins: [widget, animate],

  props: {
    animationDuration: {
      default: 0.5,
      type: Number
    }
  },

  data: () => ({
    left: 0,
    top: 0,
    show: false
  }),

  methods: {
    handleMove({x, y}) {
      const board = this.Plane
      const boardRect = board.$el.getBoundingClientRect()
      const rect = this.$el.getBoundingClientRect()
      const relY = y - boardRect.y
      const relX = x - boardRect.x - this.offsetX
      const index = Math.round(relX / board.xRatio)
      const maxLeft = board.canvas.x1 - rect.width
      const maxTop = board.canvas.y1 - rect.height
      const offset = 10

      if (relY >= board.canvas.y0 && relY <= board.canvas.y1) {
        if (index > -1 && index < board.len) {
          this.left = Math.min(
            index * board.xRatio + this.offsetX + offset,
            maxLeft
          )
          this.$set(this.store, 'activedIndex', index)
          this.top = Math.min(relY + offset, maxTop)
          this.show = true
        }
        return
      }
      this.handleLeave()
    },

    handleLeave() {
      this.show = false
      this.$set(this.store, 'activedIndex', null)
    }
  },

  computed: {
    offsetX() {
      const board = this.Plane
      return board.canvas.x0 + board.gap
    }
  },
  mounted() {
    const board = this.Plane
    const el = board.$el

    el.addEventListener('mousemove', debounce(this.handleMove, 10))
    el.addEventListener('mouseleave', this.handleLeave)
    el.addEventListener(
      'touchmove',
      e => {
        const touch = e.touches[0]
        this.handleMove({x: touch.clientX, y: touch.clientY})
      },
      {
        passive: true
      }
    )
  },

  render(h) {
    const {activedLabel, activedPoint = [], activedIndex} = this.store
    const slot = this.$scopedSlots.default
    const tooltip = slot ?
      slot({
        label: activedLabel,
        actived: activedPoint,
        index: activedIndex
      }) :
      h(
        'div',
        {
          style: {
            background: '#00000095',
            padding: '8px',
            color: '#fff',
            borderRadius: '4px'
          }
        },
        [
          h(
            'div',
            {
              style: {
                marginBottom: '.5em'
              }
            },
            activedLabel
          ),
          activedPoint.map(active =>
            h('div', [
              h('span', {
                style: {
                  backgroundColor: active.color,
                  height: '10px',
                  width: '10px',
                  borderRadius: '50%',
                  display: 'inline-block',
                  marginRight: '5px'
                }
              }),
              active.label &&
                  h(
                    'span',
                    {
                      style: {
                        marginRight: '5px'
                      }
                    },
                    active.label + ':'
                  ),
              h('span', active.value)
            ])
          )
        ]
      )

    return h(
      'div',
      {
        class: 'la-tooltip',
        style: {
          position: 'absolute',
          top: 0,
          transform: `translate(${this.left}px, ${this.top}px)`,
          transition: this.trans,
          opacity: Number(this.show)
        }
      },
      [tooltip]
    )
  }
}
