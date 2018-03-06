export default {
  props: {
    prop: String,

    data: Array
  },

  inject: ['Artboard'],

  computed: {
    src() {
      return this.data || this.Artboard.data.map(o => o[this.prop])
    }
  }
}
