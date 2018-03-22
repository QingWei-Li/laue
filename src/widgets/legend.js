import widget from '../mixins/widget'

export default {
  name: 'LaLegend',

  mixins: [widget],

  props: {
    selectable: Boolean,

    /**
     * ^(top|bottom|left|right)(-(start|center|end))?$
     */
    placement: String,

    color: String
  },

  computed: {
    curColor() {
      return this.color || this.Artboard.textColor
    }
  },

  render(h) {
    const {props, store} = this.Artboard
    const {curColor} = this

    return h(
      'div',
      {
        class: 'la-legend',
        style: {
          position: 'absolute',
          left: '50%',
          // Top: 0,
          transform: 'translate(-50%, -50%)'
        }
      },
      props.map(prop =>
        h(
          'div',
          {
            style: {
              display: 'inline-block',
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
