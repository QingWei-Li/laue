import Artboard from './objects/artboard'
import Line from './charts/line'
import Area from './charts/area'
import XAxis from './objects/x-axis'

export function Laue(Vue) {
  [Artboard, Line, Area, XAxis].forEach(c => {
    Vue.component(c.name, c)
  })
}

export {Line, Artboard, Area, XAxis}
