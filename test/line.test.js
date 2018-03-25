import {artboardMount, DATA} from './util'
import {Line, Artboard} from '../src'
import {curveBasis} from 'd3-shape'

describe('Props', () => {
  it(':prop - render correctly', () => {
    const wrapper = artboardMount(h => [
      h(Line, {
        props: {
          prop: 'pv'
        }
      })
    ])

    expect(wrapper.find('path').attributes().d).toBeTruthy()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it(':prop - empty data', () => {
    const wrapper = artboardMount(h => [h(Line)])

    expect(wrapper.find('path').attributes().d).toBeUndefined()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it(':color - default', () => {
    const wrapper = artboardMount(h => [h(Line)])

    expect(wrapper.find('path').attributes().stroke).toBe(
      Artboard.props.colors.default()[0]
    )
  })

  it(':color - custom color', () => {
    const wrapper = artboardMount(h => [
      h(Line, {
        props: {
          color: 'red'
        }
      })
    ])

    expect(wrapper.find('path').attributes().stroke).toBe('red')
  })

  it(':width', () => {
    const wrapper = artboardMount(h => [
      h(Line, {
        props: {
          width: 30
        }
      })
    ])

    expect(wrapper.find('path').attributes()['stroke-width']).toBe('30')
  })

  it(':dot', () => {
    const wrapper = artboardMount(h => [
      h(Line, {
        props: {
          dot: true,
          prop: 'pv'
        }
      })
    ])

    expect(wrapper.findAll('circle').length).toEqual(DATA.length)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it(':dashed - bool type', () => {
    const wrapper = artboardMount(h => [
      h(Line, {
        props: {
          dashed: true
        }
      })
    ])

    expect(wrapper.find('path').element.style['stroke-dasharray']).toBe('3')
  })

  it(':dashed - string type', () => {
    const wrapper = artboardMount(h => [
      h(Line, {
        props: {
          dashed: '3 4'
        }
      })
    ])

    expect(wrapper.find('path').element.style['stroke-dasharray']).toBe('3 4')
  })

  it(':hideLine', () => {
    const wrapper = artboardMount(h => [
      h(Line, {
        props: {
          hideLine: true,
          prop: 'pv'
        }
      })
    ])

    expect(wrapper.contains('path')).toBeFalsy()
  })

  it(':hideLine - hide the line but render dots', () => {
    const wrapper = artboardMount(h => [
      h(Line, {
        props: {
          hideLine: true,
          dot: true,
          prop: 'pv'
        }
      })
    ])

    expect(wrapper.findAll('circle').length).toBe(DATA.length)
  })

  it(':curve - smoosh line', () => {
    const wrapper = artboardMount(h => [
      h(Line, {
        props: {
          curve: true,
          prop: 'pv'
        }
      })
    ])

    expect(wrapper.html()).toMatchSnapshot()
  })

  it(':curve - custom function', () => {
    const wrapper = artboardMount(h => [
      h(Line, {
        props: {
          curve: curveBasis,
          prop: 'pv'
        }
      })
    ])

    expect(wrapper.html()).toMatchSnapshot()
  })

  it(':continued - false', () => {
    const wrapper = artboardMount(
      h => [
        h(Line, {
          props: {
            continued: false,
            dot: true,
            prop: 'pv'
          }
        })
      ],
      {
        props: {
          data: [{pv: 100}, {pv: 200}, {}, {pv: 300}, {pv: 400}]
        }
      }
    )

    expect(wrapper.findAll('circle').length).toBe(4)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it(':continued - true', () => {
    const wrapper = artboardMount(
      h => [
        h(Line, {
          props: {
            continued: false,
            prop: 'pv'
          }
        })
      ],
      {
        props: {
          data: [{pv: 100}, {pv: 200}, {}, {pv: 300}, {pv: 400}]
        }
      }
    )

    expect(wrapper.html()).toMatchSnapshot()
  })

  it(':showValue', () => {
    const wrapper = artboardMount(h => [
      h(Line, {
        props: {
          showValue: true,
          prop: 'pv'
        }
      })
    ])

    expect(wrapper.findAll('text').length).toBe(DATA.length)
    expect(wrapper.html()).toMatchSnapshot()
  })
})

describe('Slots', () => {
  it('default(scoped slot)', () => {
    const wrapper = artboardMount(h => [
      h(Line, {
        props: {
          prop: 'pv'
        },
        scopedSlots: {
          default: props => {
            return h(
              'text',
              {
                class: 'custom-text'
              },
              props.value
            )
          }
        }
      })
    ])

    expect(wrapper.findAll('.custom-text').length).toEqual(DATA.length)
  })
})

describe('Mixing', () => {
  it('Multiple lines', () => {
    const wrapper = artboardMount(h => [
      h(Line, {
        props: {
          prop: 'pv'
        }
      }),
      h(Line, {
        props: {
          prop: 'uv'
        }
      }),
      h(Line, {
        props: {
          prop: 'error-prop'
        }
      })
    ])

    expect(wrapper.findAll('path[d]').length).toBe(2)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
