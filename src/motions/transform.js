import {getSupportedPropertyName} from '../utils/dom'

function getHooks(props) {
  return {
    beforeEnter(el) {
      const key = props.attrName
      // El.style[key] = props.from
      el.style[getSupportedPropertyName('transition')] = `${key} 1s`
    },

    enter(el) {
      console.log('111', el)
    }
  }
}

export default {
  name: 'Transform',

  functional: true,

  props: {
    from: String,
    to: String,
    attrName: String
  },

  render(h, {props, children}) {
    return h('transition-group', {on: getHooks(props)}, children)
  }
}
