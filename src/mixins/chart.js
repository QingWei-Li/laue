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
    }
  },

  inject: ['Artboard'],

  computed: {
    values() {
      return this.data || this.Artboard.data.map(o => o[this.prop])
    }
  }
}
