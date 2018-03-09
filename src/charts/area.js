import Line from './line'
import area from 'd3-shape/src/area'

export default {
  name: 'LaArea',

  functional: true,

  props: ['color'],

  render(h, {data}) {
    return h('g', [
      h('linearGradient', {}, [h('stop'), h('stop')]),
      h(Line, data)
    ])
  }
}
