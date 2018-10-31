import plane from '../mixins/plane'

export default {
  name: 'LaPolar',

  mixins: [plane],

  props: {
    fillContainer: Boolean
  },

  computed: {
    min() {
      return Math.min(this.viewWidth, this.height)
    }
  },

  render(h) {
    const {viewWidth, height, autoresize} = this
    const slots = this.$slots.default || []

    /**
     * Reset snap
     */
    this.snap = {}

    const props = []
    const polars = []
    const widgets = []
    const others = []

    slots.forEach(slot => {
      const options = slot.componentOptions
      if (!options) {
        others.push(slot)
        return
      }
      const sealed = options.Ctor.sealedOptions
      if (!sealed) {
        return
      }
      const {propsData} = options
      const {prop} = propsData

      switch (sealed.type) {
        case 'polar':
          if (prop && props.indexOf(prop) < 0) {
            props.push(prop)
          }
          slot.index = polars.length
          polars.push(slot)
          break
        case 'widget':
          widgets.push(slot)
          break
        default:
          break
      }
    })

    this.props = props

    return h(
      'div',
      {
        style: {
          position: 'relative',
          width: autoresize ? '100%' : viewWidth + 'px'
        }
      },
      [
        h(
          'svg',
          {
            attrs: {
              width: this.fillContainer ? '100%' : viewWidth,
              height: this.fillContainer ? '100%' : height,
              viewBox: this.fillContainer ? `0 0 ${this.min} ${this.min}` : `0 0 ${viewWidth} ${height}`,
              preserveAspectRatio: 'xMinYMin'
            }
          },
          [others, polars]
        ),
        widgets
      ]
    )
  }
}
