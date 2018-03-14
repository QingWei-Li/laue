import linear from '../mixins/linear'

export default {
  name: 'LaBar',

  mixins: [linear],

  render(h) {
    return h('g')
  }
}
