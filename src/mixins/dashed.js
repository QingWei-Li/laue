export default {
  props: {
    dashed: [Boolean, String]
  },

  computed: {
    curDashed() {
      const {dashed} = this

      return dashed === true || dashed === '' ?
        3 :
        dashed === false ? 'none' : dashed
    }
  }
}
