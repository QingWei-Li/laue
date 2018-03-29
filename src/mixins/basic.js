export default {
  inject: ['Plane'],

  computed: {
    store() {
      return this.Plane.store
    }
  }
}
