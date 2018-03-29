import values from './values'
import animate from './animate'
import {isArr, isNil} from '../utils/core'

export default {
  mixins: [values, animate],

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
      return this.color || this.Plane.genColor(this.id)
    },

    actived() {
      const {hidden} = this.store

      if (!isArr(hidden)) {
        return true
      }

      return hidden.indexOf(this.id) < 0
    }
  },

  watch: {
    'store.activedIndex'(index) {
      const {store} = this

      store.activedPoint = [].concat(store.activedPoint)

      this.$set(store.activedPoint, this.id, {
        color: this.curColor,
        value: this.raws[index],
        label: this.label
      })
    },

    curColor: {
      immediate: true,
      handler(val) {
        const {store} = this

        store.colors = store.colors || {}
        this.$set(store.colors, this.id, val)
      }
    },

    label: {
      immediate: true,
      handler(val) {
        const {store} = this

        store.labels = store.labels || {}
        this.$set(store.labels, this.id, val)
      }
    },

    props: {
      immediate: true,
      handler(val) {
        const {store} = this

        store.props = store.props || {}

        if (!isNil(this.id)) {
          this.$set(store.props, this.id, val)
        }
      }
    }
  }
}
