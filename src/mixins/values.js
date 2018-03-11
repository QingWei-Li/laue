export default {
  props: {
    data: Array,

    prop: String
  },

  inject: ['Artboard'],

  computed: {
    values() {
      const {data, prop} = this

      return data || (prop && this.Artboard.data.map(o => o[prop]))
    }
  }
}
