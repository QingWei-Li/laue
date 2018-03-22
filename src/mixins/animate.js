export default {
  props: {
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

  methods: {
    trans() {
      return (
        this.transition ||
        (this.animated ?
          `all ${this.animationDuration}s ${this.animationEffect}` :
          '')
      )
    }
  }
}
