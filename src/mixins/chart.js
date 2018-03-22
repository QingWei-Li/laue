import values from './values'
import animate from './animate'

export default {
  mixins: [values, animate],

  type: 'chart',

  props: {
    points: Array,

    color: String,

    label: String,

    showValue: Boolean
  },

  computed: {
    id() {
      return this.$vnode.index
    },

    curColor() {
      return this.color || this.Artboard.genColor(this.id)
    }
  }
}
