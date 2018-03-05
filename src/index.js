import Artboard from './artboard'
import Line from './line'

export default function install(Vue) {
  Vue.use(Artboard)
  Vue.use(Line)
}

if (typeof window !== 'undefined') {
  window.Vue.use(install)
}
