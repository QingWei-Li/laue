import {cartesianMount, DATA} from './util'
import {Bar} from '../src'

describe('Props', () => {
  it(':prop', () => {
    const wrapper = cartesianMount(h => [
      h(Bar, {
        props: {
          prop: 'pv'
        }
      })
    ])

    expect(wrapper.findAll('rect').length).toBe(DATA.length)
  })

  it(':width', () => {
    const wrapper = cartesianMount(h => [
      h(Bar, {
        props: {
          prop: 'pv',
          width: 12
        }
      })
    ])

    expect(wrapper.find('rect').attributes().width).toBe('12')
  })

  it(':showValue', () => {
    const wrapper = cartesianMount(h => [
      h(Bar, {
        props: {
          prop: 'pv',
          showValue: true
        }
      })
    ])

    expect(wrapper.findAll('text').length).toBe(DATA.length)
  })
})

describe('Mixing', () => {
  it('Cartesian:distance', () => {
    const wrapper = cartesianMount(
      h => [
        h(Bar, {
          props: {
            prop: 'pv',
            width: 20
          }
        }),
        h(Bar, {
          props: {
            prop: 'amt',
            width: 20
          }
        })
      ],
      {
        props: {
          distance: 2
        }
      }
    )
    const [rect1, rect2] = wrapper.findAll('g > rect:first-child').wrappers
    const attr1 = rect1.attributes()
    const attr2 = rect2.attributes()

    expect(attr2.x - attr1.x - attr1.width).toBe(2)
  })

  it('Cartesian:narrow', () => {
    const wrapper = cartesianMount(
      h => [
        h(Bar, {
          props: {
            prop: 'pv',
            width: 20
          }
        })
      ],
      {
        props: {
          narrow: true
        }
      }
    )

    expect(wrapper.find('g > rect:first-child').attributes().x > 0).toBeTruthy()
  })
})
