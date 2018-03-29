import basic from './basic'

export default {
  mixins: [basic],

  props: {
    color: String
  },

  type: 'object',

  computed: {
    curColor() {
      return this.color || this.Plane.textColor
    }
  }
}
