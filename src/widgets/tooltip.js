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
    handleMove(e) {
      const board = this.Artboard
      const rect = this.$el.getBoundingClientRect()
      const relY = e.y - this.boardRect.y
      const relX = e.x - this.boardRect.x - this.offsetX
      const index = Math.round(relX / board.xRatio)
      const maxLeft = board.canvas.x1 - rect.width
      const maxTop = board.canvas.y1 - rect.height

      if (relY >= board.canvas.y0 && relY <= board.canvas.y1) {
        if (index > -1 && index < board.len) {
          this.left = Math.min(index * board.xRatio + this.offsetX, maxLeft)
          board.activedIndex = index
        }
        this.top = Math.min(relY, maxTop)
        this.show = true
      } else {
        board.activedIndex = null
        this.show = false
      }
    },

    handleLeave() {
      this.show = false
    },

    handleClick() {
      console.log('click')
    }
  },

  computed: {
    offsetX() {
      const board = this.Artboard
      return board.canvas.x0 + board.gap
    }
  },

  mounted() {
    const board = this.Artboard
    const el = board.$el
    this.boardRect = el.getBoundingClientRect()

    el.addEventListener('mousemove', debounce(this.handleMove, 10))
    el.addEventListener('mouseleave', this.handleLeave)
    el.addEventListener('click', this.handleClick)
  },

  render(h) {
    return h(
      'div',
      {
        class: 'la-tooltip',
        style: {
          position: 'absolute',
          top: 0,
          transform: `translate(${this.left}px, ${this.top}px)`,
          transition: this.trans,
          visibility: this.show ? 'visible' : 'hidden'
        }
      },
      [
        h(
          'div',
          {
            class: ''
          },
          '类目名'
        ),
        h('div', {}, 'label'),
        h('div', {}, 'value')
      ]
    )
  }
}
