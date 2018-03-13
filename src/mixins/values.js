export default {
  props: {
    prop: String
  },

  inject: ['Artboard'],

  computed: {
    values() {
      const {prop, Artboard} = this

      return prop && Artboard.data.map(o => o[prop])
    }
  }
}
