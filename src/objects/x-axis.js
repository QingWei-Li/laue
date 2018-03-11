import values from '../mixins/values'
import axes from '../mixins/axes'

export default {
  name: 'LaXAxis',

  mixins: [values, axes],

  props: {
    type: {
      type: String,
      default: 'category'
    }
  },

  computed: {
    points() {
      const {width, height} = this.Artboard.canvas
      const len = this.values.length
      const xRatio = width / (len - 1)

      return this.values.map((v, i) => {
        const x = i * xRatio
        return [x, height]
      })
    }
  },

  render(h) {
    return h('g', [h('line', {})])
  }
}
