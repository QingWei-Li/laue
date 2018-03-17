import values from './values'

export default {
  mixins: [values],

  type: 'chart',

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

    transition: String,

    points: Array,

    color: String,

    label: String,

    showValue: Boolean
  },

  computed: {
    id() {
      return this.$vnode.index
    },

    trans() {
      return (
        this.transition ||
        (this.animated ?
          `all ${this.animationDuration}s ${this.animationEffect}` :
          '')
      )
    },

    curColor() {
      return this.color || this.Artboard.genColor(this.id)
    }
  }
}
