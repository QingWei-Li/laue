import {cartesianMount, sleep} from './util'
import {Line, Cartesian, Tooltip} from '../src'

it('render tooltip', () => {
  const wrapper = cartesianMount(h => [
    h(Line, {
      props: {
        prop: 'pv',
        label: 'haha'
      }
    }),
    h(Tooltip)
  ])

  expect(wrapper.contains(Tooltip)).toBeTruthy()
})

it('hover', async function () {
  const wrapper = cartesianMount(h => [
    h(Line, {
      props: {
        prop: 'pv',
        label: 'haha'
      }
    }),
    h(Tooltip)
  ])
  const beforeHTML = wrapper.html()

  wrapper.trigger('mousemove', {
    x: 200,
    y: 100
  })
  await sleep(20)
  expect(wrapper.html()).not.toBe(beforeHTML)
})
