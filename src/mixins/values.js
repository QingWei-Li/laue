import basic from './basic'

export default {
  props: {
    prop: String
  },

  mixins: [basic],

  computed: {
    raws() {
      const {prop, Cartesian} = this

      return prop ? Cartesian.data.map(o => o[prop]) : null
    },

    values() {
      const {prop, Cartesian} = this

      return Cartesian.curData.filter(arr => arr.key === prop)[0] || []
    }
  }
}
