export default {
  props: {
    data: Array,

    prop: String
  },

  inject: ['Artboard'],

  computed: {
    values() {
      return this.data || this.Artboard.data.map(o => o[this.prop])
    }
  }
}
