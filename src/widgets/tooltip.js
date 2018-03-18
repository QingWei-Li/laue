import widget from '../mixins/widget'

export default {
  name: 'LaTooltip',

  mixins: [widget],

  props: {},

  data: () => ({
    left: 0,
    top: 0,
    hidden: true
  }),

  mounted() {
    const board = this.Artboard
    const rect = board.$el.getBoundingClientRect()
    let lock

    board.$on('hover', e => {
      if (lock) {
        lock = false
        return
      }
      this.hidden = false
      this.left = e.x - rect.x
      this.top = e.y - rect.y
    })
  },

  render(h) {
    const {left, top} = this

    return h(
      'div',
      {
        class: 'la-tooltip',
        on: {
          mouseover: () => {
            this.hidden = false
          }
        },
        style: {
          position: 'absolute',
          top: 0,
          transform: `translate(${left}px, ${top}px)`,
          transition: 'transform .6s',
          visibility: this.hidden ? 'hidden' : 'visible'
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
