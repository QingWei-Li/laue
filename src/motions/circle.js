import Trans from './trans'

export default {
  name: 'LaMotionCircle',

  functional: true,

  props: ['r', 'transition'],

  render(h, {children, props, parent}) {
    const id = `la-circle-${parent._uid}`
    const {transition} = props

    return h('g', [
      h('defs', [
        h(
          'clipPath',
          {
            attrs: {
              id
            }
          },
          [
            h(
              Trans,
              {
                props: {
                  from: {
                    r: 0
                  },
                  trans: transition
                }
              },
              [
                h('circle', {
                  attrs: {
                    r: props.r * 1.5
                  }
                })
              ]
            )
          ]
        )
      ]),
      h(
        'g',
        {
          attrs: {
            'clip-path': `url(#${id})`
          }
        },
        children
      )
    ])
  }
}
