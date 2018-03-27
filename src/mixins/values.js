import basic from './basic'

export default {
  props: {
    prop: String
  },

  mixins: [basic],

  computed: {
    raws() {
      const {prop, Artboard} = this

      return prop ? Artboard.data.map(o => o[prop]) : null
    },

    values() {
      const {prop, Artboard} = this

      return Artboard.curData.filter(arr => arr.key === prop)[0] || []
    }
  }
}
