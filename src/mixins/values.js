export default {
  props: {
    prop: String
  },

  inject: ['Artboard'],

  computed: {
    raws() {
      const {prop, Artboard} = this

      return Artboard.data.map(o => o[prop])
    },

    values() {
      const {prop, Artboard} = this

      return Artboard.curData.filter(arr => arr.key === prop)[0]
    }
  }
}
