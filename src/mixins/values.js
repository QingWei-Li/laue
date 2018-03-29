import basic from './basic'

export default {
  props: {
    prop: String
  },

  mixins: [basic],

  computed: {
    raws() {
      const {prop, Plane} = this

      return prop ? Plane.data.map(o => o[prop]) : null
    },

    values() {
      const {prop, Plane} = this

      return Plane.curData.filter(arr => arr.key === prop)[0] || []
    }
  }
}
