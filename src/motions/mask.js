export default {
  name: 'LaMask',

  functional: true,

  props: ['axis', 'transition'],

  render(h, {children, props, parent}) {
    const vnode = Array.isArray(children) ? children[0] : children
    const maskId = `la-mask-${parent._uid}`
    const data = vnode.data || {}
    const {axis, transition} = props

    data.attrs = data.attrs || {}
    data.attrs['clip-path'] = `url(#${maskId})`
    vnode.data = data

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
              'transition',
              {
                props: {
                  appear: true
                },
                on: {
                  beforeEnter(el) {
                    el.style.width = '100%'
                    el.style.height = '100%'
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
      vnode
    ])
  }
}
