import Artboard from './objects/artboard'
import Line from './charts/line'
import Area from './charts/area'
import Bar from './charts/bar'
import XAxis from './objects/x-axis'
import YAxis from './objects/y-axis'
import XAxisInverse from './objects/x-axis-inverse'
import YAxisInverse from './objects/y-axis-inverse'

export function Laue(Vue) {
  [
    Artboard,
    Line,
    Area,
    Bar,
    XAxis,
    YAxis,
    XAxisInverse,
    YAxisInverse
  ].forEach(c => {
    Vue.component(c.name, c)
  })
}

export {Line, Artboard, Area, Bar, XAxis, YAxis, XAxisInverse, YAxisInverse}
