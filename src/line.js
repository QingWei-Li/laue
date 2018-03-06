import Chart from './mixins/chart'

export default {
  name: 'LaLine',

  mixins: [Chart],

  props: {
    color: String
  },

  render(h) {
    return h('path', {
      attrs: {
        stroke: this.color
      }
    })
  }
}
