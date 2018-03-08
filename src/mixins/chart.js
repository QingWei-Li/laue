export default {
  props: {
    prop: String,

    data: Array,

    animated: Boolean,

    animationDuration: Number,

    animationEasing: String
  },

  inject: ['Artboard'],

  computed: {
    values() {
      return this.data || this.Artboard.data.map(o => o[this.prop])
    },

    canvas() {
      const {vw, vh, padding} = this.Artboard
      // Todo 加上 axis 等信息
      const x0 = padding
      const y0 = padding
      const width = vw - padding * 2
      const height = vh - padding * 2

      return {x0, y0, width, height}
    }
  }
}
