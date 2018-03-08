import Artboard from './objects/artboard'
import Line from './charts/line'

export function Laue(Vue) {
  Vue.component(Artboard.name, Artboard)
  Vue.component(Line.name, Line)
}

export {Line, Artboard}
