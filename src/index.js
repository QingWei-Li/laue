import Artboard from './objects/artboard'
import Line from './charts/line'
import Area from './charts/area'

export function Laue(Vue) {
  Vue.component(Artboard.name, Artboard)
  Vue.component(Line.name, Line)
  Vue.component(Area.name, Area)
}

export {Line, Artboard, Area}
