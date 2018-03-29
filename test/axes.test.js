import {cartesianMount, DATA} from './util'
import {Line, XAxis, YAxis, XAxisInverse, YAxisInverse} from '../src'

describe('Props', () => {
  it(':prop', () => {
    const wrapper = cartesianMount(h => [
      h(Line, {
        props: {
          prop: 'pv'
        }
      }),
      h(XAxis, {
        props: {
          prop: 'name'
        }
      })
    ])

    expect(wrapper.findAll('line').length).toBe(DATA.length + 1)
    expect(wrapper.findAll('text').length).toBe(DATA.length)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it(':color', () => {
    const wrapper = cartesianMount(h => [
      h(Line, {
        props: {
          prop: 'pv'
        }
      }),
      h(XAxis, {
        props: {
          color: 'red'
        }
      })
    ])

    expect(wrapper.findAll('line[stroke=red]').length).toBe(DATA.length)
  })

  it(':tickSize', () => {
    const wrapper = cartesianMount(h => [
      h(Line, {
        props: {
          prop: 'pv'
        }
      }),
      h(XAxis, {
        props: {
          tickSize: 1
        }
      })
    ])

    expect(wrapper.html()).toMatchSnapshot()
  })

  it(':fontSize', () => {
    const wrapper = cartesianMount(h => [
      h(Line, {
        props: {
          prop: 'pv'
        }
      }),
      h(XAxis, {
        props: {
          fontSize: 11
        }
      })
    ])

    expect(
      wrapper
        .find(XAxis)
        .find('g g')
        .attributes()['font-size']
    ).toBe('11')
  })

  it(':format', () => {
    const wrapper = cartesianMount(h => [
      h(Line, {
        props: {
          prop: 'pv'
        }
      }),
      h(XAxis, {
        props: {
          format: v => v + '[format]'
        }
      })
    ])

    expect(
      wrapper
        .find(XAxis)
        .find('text')
        .text()
    ).toContain('[format]')
  })

  it(':gridline', () => {
    const wrapper = cartesianMount(h => [
      h(Line, {
        props: {
          prop: 'pv'
        }
      }),
      h(XAxis, {
        props: {
          gridline: true
        }
      })
    ])

    expect(wrapper.find(XAxis).findAll('line').length).toBe(DATA.length * 2 + 1)
  })

  it(':dashed', () => {
    const wrapper = cartesianMount(h => [
      h(Line, {
        props: {
          prop: 'pv'
        }
      }),
      h(XAxis, {
        props: {
          gridline: true,
          dashed: true
        }
      })
    ])

    expect(wrapper.find(XAxis).html()).toMatchSnapshot()
  })
})

describe('Mixing', () => {
  it('Cartesian:bound', () => {
    const wrapper = cartesianMount(
      h => [
        h(Line, {
          props: {
            prop: 'pv'
          }
        }),
        h(YAxis)
      ],
      {
        props: {
          bound: [0, 6000]
        }
      }
    )
    const texts = wrapper.find(YAxis).findAll('text').wrappers

    expect(texts[0].text()).toBe('0')
    expect(texts[texts.length - 1].text()).toBe('6000')
  })

  it('Y and X', () => {
    const wrapper = cartesianMount(h => [
      h(Line, {
        props: {
          prop: 'pv'
        }
      }),
      h(YAxis),
      h(XAxis, {
        props: {
          label: 'name'
        }
      })
    ])

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('inverse', () => {
    const wrapper = cartesianMount(h => [
      h(Line, {
        props: {
          prop: 'pv'
        }
      }),
      h(YAxis),
      h(XAxis, {
        props: {
          label: 'name'
        }
      }),
      h(YAxisInverse),
      h(XAxisInverse, {
        props: {
          label: 'name'
        }
      })
    ])

    expect(wrapper.html()).toMatchSnapshot()
  })
})
