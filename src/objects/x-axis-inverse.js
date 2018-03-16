import XAxis from './x-axis'

export default {
  name: 'LaXAxisInverse',

  space: [24, 20, 0, 20],

  beforeCreate() {
    this.inverse = true
  },

  mixins: [XAxis]
}
