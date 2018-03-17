import chart from '../mixins/chart'
import pie from 'd3-shape/src/pie'
import arc from 'd3-shape/src/arc'
import {noop} from '../utils/core'

export default {
  name: 'LaPie',

  mixins: [chart],

  props: {
    translate: {
      type: String,
      default: '50%, 50%'
    }
  },

  computed: {
    arcs() {
      return pie().sortValues(noop)(this.raws)
    },

    draw() {
      return arc()
        .innerRadius(0)
        .outerRadius(100)
    }
  },

  render(h) {
    const {genColor} = this.Artboard
    const points = this.arcs.map(this.draw)

    const paths = points.map((d, i) => {
      return h('path', {
        attrs: {
          d,
          fill: genColor(i)
        },
        style: {
          transition: this.trans
        }
      })
    })

    return h(
      'g',
      {
        style: {
          transform: `translate(${this.translate})`
        }
      },
      paths
    )
  }
}
