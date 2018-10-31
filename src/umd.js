import {Laue} from './index'

if (typeof window !== 'undefined' && typeof window.Vue !== 'undefined') {
  window.Vue.use(Laue)
}

export * from './index'
