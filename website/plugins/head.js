import Vue from 'vue'

Vue.mixin({
  head() {
    let name = this.$route.name
    if (name === 'index') {
      name = 'home'
    }
    if (name) {
      name = name.replace(/^([a-z])/, m => m.toUpperCase())
    }

    return {
      title: name
    }
  }
})
