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
    'store.activedIndex'(index) {
      const store = this.store

      store.actived = [].concat(store.actived)

      this.$set(store.actived, this.id, {
        color: this.curColor,
        value: this.raws[index],
        label: this.label
      })
    },

    curColor: {
      immediate: true,
      handler(val) {
        const store = this.store

        store.colors = store.colors || {}
        this.$set(store.colors, this.prop, val)
      }
    },

    label: {
      immediate: true,
      handler(val) {
        const store = this.store

        store.labels = store.labels || {}
        this.$set(store.labels, this.prop, val)
      }
    }
  }
}
