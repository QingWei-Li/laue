import axes from '../mixins/axes'

export default {
  name: 'LaXAxis',

  axis: 'x',

  space: [0, 20, 15, 0],

  mixins: [axes],

  render(h) {
    const {points, labels, tickSize, fontSize, color} = this
    const first = points[0]
    const end = points[points.length - 1]

    const ticks = labels.map((val, i) => {
      const point = points[i]

      return h('g', [
        tickSize &&
          h('line', {
            attrs: {
              x1: point[0],
              x2: point[0],
              y1: point[1],
              y2: point[1] + tickSize,
              stroke: color
            }
          }),
        h(
          'text',
          {
            attrs: {
              x: point[0],
              y: point[1] + tickSize,
              'text-anchor': 'middle',
              dy: fontSize,
              'font-size': fontSize,
              fill: color,
              stroke: 'none'
            }
          },
          val + this.unit
        )
      ])
    })

    return h('g', [
      h('line', {
        attrs: {
          x2: end[0],
          y2: first[1],
          x1: first[0],
          y1: first[1],
          stroke: color
        }
      }),
      h('g', ticks)
    ])
  }
}
