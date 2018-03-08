export default {
  name: 'LaArtboard',

  props: {
    data: {
      type: Array,
      default: () => []
    },

    height: Number,

    width: Number,

    padding: {
      default: 8,
      type: Number
    }
  },

  computed: {
    vw() {
      return this.width || 300
    },

    vh() {
      return this.height || 75
    }
  },

  provide() {
    return {
      Artboard: this
    }
  },

  render(h) {
    const {width, height, vw, vh} = this

    return h(
      'svg',
      {
        attrs: {
          width,
          height,
          viewBox: `0 0 ${vw} ${vh}`
        }
      },
      this.$slots.default
    )
  }
}
