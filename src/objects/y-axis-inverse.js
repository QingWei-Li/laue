import YAxis from './y-axis'

export default {
  name: 'LaYAxisInverse',

  space: [0, 40, 0, 0],

  beforeCreate() {
    this.inverse = true
  },

  mixins: [YAxis]
}
