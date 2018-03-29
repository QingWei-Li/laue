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
})
