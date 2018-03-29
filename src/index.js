import Cartesian from './objects/cartesian'
import Polar from './objects/polar'
import Line from './charts/line'
import Area from './charts/area'
import Bar from './charts/bar'
import Pie from './charts/pie'
import XAxis from './objects/x-axis'
import YAxis from './objects/y-axis'
import XAxisInverse from './objects/x-axis-inverse'
import YAxisInverse from './objects/y-axis-inverse'
import YMarker from './objects/y-marker'
import YRegion from './objects/y-region'
import Tooltip from './widgets/tooltip'
import Legend from './widgets/legend'

export function Laue(Vue) {
  [
    Cartesian,
    Polar,
    Line,
    Area,
    Bar,
    Pie,
    XAxis,
    YAxis,
    XAxisInverse,
    YAxisInverse,
    Tooltip,
    Legend,
    YMarker,
    YRegion
  ].forEach(c => {
    Vue.component(c.name, c)
  })
}

export {
  Cartesian,
  Polar,
  Line,
  Area,
  Bar,
  Pie,
  XAxis,
  YAxis,
  XAxisInverse,
  YAxisInverse,
  Tooltip,
  Legend,
  YMarker,
  YRegion
}
