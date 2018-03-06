import Artboard from './artboard'
import Line from './line'

export default function install(Vue) {
  Vue.component(Artboard.name, Artboard)
  Vue.component(Line.name, Line)
}

if (typeof window.use !== 'undefined') {
  window.Vue.use(install)
}
