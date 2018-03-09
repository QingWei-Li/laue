export default {
  props: {
    prop: String,

    data: Array,

    animated: Boolean,

    animationDuration: {
      default: 1,
      type: Number
    },

    animationEffect: {
      default: 'ease',
      type: String
    },

    transition: String
  },

  inject: ['Artboard'],

  computed: {
    id() {
      return this.$vnode.index
    },

    values() {
      return this.data || this.Artboard.data.map(o => o[this.prop])
    },

    trans() {
      return (
        this.transition ||
        (this.animated &&
          `all ${this.animationDuration}s ${this.animationEffect}`)
      )
    }
  }
}
