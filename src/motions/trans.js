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
          beforeEnter(el) {
            extend(el.style, props.to)
          }
        }
      },
      children
    )
  }
}
