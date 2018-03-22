export default {
  inject: ['Artboard'],

  computed: {
    store() {
      return this.Artboard.store
    }
  }
}
