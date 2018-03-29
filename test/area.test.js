import {cartesianMount} from './util'
import {Area} from '../src'

describe('Props', () => {
  it(':prop - render correctly', () => {
    const wrapper = cartesianMount(h => [
      h(Area, {
        props: {
          prop: 'pv'
        }
      })
    ])

    expect(wrapper.findAll('path').length).toEqual(2)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it(':fillColor', () => {
    const wrapper = cartesianMount(h => [
      h(Area, {
        props: {
          prop: 'pv',
          fillColor: 'red'
        }
      })
    ])

    expect(wrapper.contains('path[fill=red]')).toBeTruthy()
  })
})

describe('Mixing', () => {
  it('Stacked areas', () => {
    const wrapper = cartesianMount(
      h => [
        h(Area, {
          props: {
            prop: 'pv'
          }
        }),
        h(Area, {
          props: {
            prop: 'uv'
          }
        }),
        h(Area, {
          props: {
            prop: 'error-prop'
          }
        })
      ],
      {
        props: {
          stacked: true
        }
      }
    )

    expect(wrapper.html()).toMatchSnapshot()
  })
})
