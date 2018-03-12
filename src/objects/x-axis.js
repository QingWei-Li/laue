import axes from '../mixins/axes'

export default {
  name: 'LaXAxis',

  axis: 'x',

  space: [2, 30],

  mixins: [axes],

  render(h) {
    console.log(this.points, 123)
    return h('g', [h('line', {})])
  }
}
