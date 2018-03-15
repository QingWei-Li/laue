import linear from '../mixins/linear'

export default {
  name: 'LaBar',

  mixins: [linear],

  props: {
    width: [Number, Function]
  },

  computed: {
    rects() {}
  },

  render(h) {
    const {height, y0} = this.Artboard.canvas

    const rects = this.curPoints.map(point => {
      return h('rect', {
        attrs: {
          x: point[0],
          y: point[1],
          width: 20,
          height: height + y0 - point[1]
        }
      })
    })

    return h('g', rects)
  }
}
