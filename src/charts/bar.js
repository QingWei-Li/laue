import chart from '../mixins/chart'

export default {
  name: 'LaBar',

  mixins: [chart],

  render(h) {
    return h('g')
  }
}
