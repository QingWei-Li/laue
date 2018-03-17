export default {
  props: {
    prop: String
  },

  inject: ['Artboard'],

  computed: {
    values() {
      const {prop, Artboard} = this

      return (
        Artboard.curData.filter(arr => arr.key === prop)[0] ||
        Artboard.data.map(o => o[prop])
      )
    }
  }
}
