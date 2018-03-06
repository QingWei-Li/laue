export default {
  name: 'LaArtboard',

  props: {
    data: {
      type: Array,
      default: () => []
    },

    height: {
      type: [Number, String],
      default: '25%'
    },

    width: {
      type: [Number, String],
      default: '100%'
    }
  },

  provide() {
    return {
      Artboard: this
    }
  },

  render(h) {
    const {width, height} = this

    return h(
      'svg',
      {
        attrs: {
          width,
          height
        }
      },
      this.$slots.default
    )
  }
}
