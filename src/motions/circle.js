import Trans from './trans'

export default {
  name: 'LaMotionCircle',

  functional: true,

  props: ['r', 'transition'],

  render(h, {children, props, parent}) {
    const id = `la-circle-${parent._uid}`
    const {axis, transition} = props

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
                    width: axis === 'x' ? 0 : '100%',
                    height: axis === 'y' ? 0 : '100%'
                  },
                  trans: transition
                }
              },
              [
                h('circle', {
                  attrs: {
                    cx: props.r,
                    cy: props.r,
                    r: props.r
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
            'clip-path': `url(#${maskId})`
          }
        },
        children
      )
    ])
  }
}
