import Chart from './mixins/chart'

export default {
  name: 'Line',

  mixins: [Chart],

  render(h) {
    return h('path', '')
  }
}
