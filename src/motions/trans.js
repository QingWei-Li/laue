export default {
  name: 'ElTrans',

  functional: true,

  props: ['from', 'trans'],

  render(h, {children, props}) {
    return h(
      'transition',
      {
        props: {
          appear: true
        },
        on: {
          beforeAppear(el) {
            // eslint-disable-next-line
            for (const key in props.from) {
              const val = props.from[key]
              const last = el.getAttribute(key)
              el.setAttribute(`data-${key}`, last)
              el.setAttribute(key, val)
            }
          },

          appear(el) {
            setTimeout(() => {
              el.style.transition = props.trans
              el.style.WebkitTransition = props.trans
              el.style.msTransition = props.trans
              el.style.MozTransition = props.trans

              // eslint-disable-next-line
              for (const key in props.from) {
                const last = el.getAttribute(`data-${key}`)
                el.setAttribute(key, last)
                el.removeAttribute(`data-${key}`)
              }
            })
          }
        }
      },
      children
    )
  }
}
