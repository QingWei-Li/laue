import values from './values'
import animate from './animate'

export default {
  mixins: [values, animate],

  type: 'chart',

  props: {
    points: Array,

    color: String,

    label: String,

    showValue: Boolean
  },

  computed: {
    id() {
      return this.$vnode.index
    },

    curColor() {
      return this.color || this.Artboard.genColor(this.id)
    }
  },

  watch: {
    'Artboard.store.activedIndex'(index) {
      const store = this.Artboard.store
      const id = this.id

      store.actived = [].concat(store.actived)

      this.$set(store.actived, id, {
        color: this.curColor,
        value: this.raws[index],
        label: this.label
      })
    }
  }
}
