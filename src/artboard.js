export default {
  name: 'LaArtboard',

  props: {
    data: {
      type: Array,
      default: () => []
    },

    vh: {
      type: Number,
      default: 75
    },

    vw: {
      type: Number,
      default: 300
    },

    padding: {
      default: 8,
      type: Number
    }
  },

  provide() {
    return {
      Artboard: this
    }
  },

  render(h) {
    const {vw, vh} = this

    return h(
      'svg',
      {
        attrs: {
          viewBox: `0 0 ${vw} ${vh}`
        }
      },
      this.$slots.default
    )
  }
}
