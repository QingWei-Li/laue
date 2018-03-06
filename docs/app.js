import Vue from 'vue'
import App from './App.vue'
import Laue from '../dist/laue.es'

Vue.use(Laue)

new Vue({
  el: '#app',
  render: h => h(App)
})
