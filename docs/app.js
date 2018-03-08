import Vue from 'vue'
import App from './App.vue'
import {Laue} from '../dist/laue'

Vue.use(Laue)

// eslint-disable-next-line
new Vue({
  el: '#app',
  render: h => h(App)
})
