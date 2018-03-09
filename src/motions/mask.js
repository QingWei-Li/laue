import Trans from './trans'

export default {
  name: 'LaMask',

  functional: true,

  props: ['axis', 'transition'],

  render(h, {children, props, parent}) {
    const maskId = `la-mask-${parent._uid}`
    const {axis, transition} = props

    return h('g', [
      h('defs', [
        h(
          'clipPath',
          {
            attrs: {
              id: maskId
            }
          },
          [
            h(
              Trans,
              {
                props: {
                  to: {
                    width: '100%',
                    height: '100%'
                  }
                }
              },
              [
                h('rect', {
                  attrs: {
                    x: 0,
                    y: 0,
                    width: axis === 'x' ? 0 : '100%',
                    height: axis === 'y' ? 0 : '100%'
                  },
                  style: {
                    transition
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
