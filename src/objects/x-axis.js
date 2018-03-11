import axes from '../mixins/axes'
import values from '../mixins/values'

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
      if (!this.values) {
        const {canvas, len} = this.Artboard
        const xRatio = canvas.width / len

        console.log(xRatio)

        // Todo
      }
    }
  },

  render(h) {
    return h('g', [h('line', {})])
  }
}
