import values from '../mixins/values'
import axes from '../mixins/axes'

export default {
  name: 'LaYAxis',

  axis: 'y',

  space: [3, 60],

  mixins: [values, axes],

  render(h) {
    console.log(this.points)
    return h('g')
  }
}
