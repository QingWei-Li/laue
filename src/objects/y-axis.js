import axes from '../mixins/axes'

export default {
  name: 'LaYAxis',

  axis: 'y',

  space: [3, 40],

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
              x2: point[0] - tickSize,
              y1: point[1],
              y2: point[1],
              stroke: color
            }
          }),
        h(
          'text',
          {
            attrs: {
              x: point[0] - tickSize * 2,
              y: point[1],
              dy: fontSize / 2 - 2,
              'text-anchor': 'end',
              'font-size': fontSize,
              fill: color,
              stroke: 'none'
            }
          },
          val
        )
      ])
    })

    return h('g', [
      h('line', {
        attrs: {
          x2: first[0],
          y2: end[1],
          x1: first[0],
          y1: first[1],
          stroke: color
        }
      }),
      h('g', ticks)
    ])
  }
}
