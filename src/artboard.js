export default {
  name: 'Artboard',

  props: {},

  render(h) {
    return h('svg', this.$slots.default)
  }
}
