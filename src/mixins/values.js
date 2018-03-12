export default {
  props: {
    prop: String
  },

  inject: ['Artboard'],

  computed: {
    values() {
      const {prop} = this

      return prop && this.Artboard.data.map(o => o[prop])
    }
  }
}
