export default {
  inject: ['Cartesian'],

  computed: {
    store() {
      return this.Cartesian.store
    }
  }
}
