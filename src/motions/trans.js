import {extend} from '../utils/core'

export default {
  name: 'ElTrans',

  functional: true,

  props: ['to'],

  render(h, {children, props}) {
    return h(
      'transition',
      {
        props: {
          appear: true
        },
        on: {
          enter(el, done) {
            setTimeout(() => {
              extend(el.style, props.to)
              done()
            })
          }
        }
      },
      children
    )
  }
}
