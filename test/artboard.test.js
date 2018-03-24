import Artboard from '../src/objects/artboard'
import {mount} from '@vue/test-utils'
import {sleep} from './util'

describe('Props', () => {
  it(':height - should render correctly', () => {
    const wrapper = mount(Artboard, {
      propsData: {
        height: 400
      }
    })
    const attrs = wrapper.find('svg').attributes()

    expect(Number(attrs.height)).toBe(400)
  })

  it(':width - should render correctly', () => {
    const wrapper = mount(Artboard, {
      propsData: {
        width: 500
      }
    })
    const attrs = wrapper.find('svg').attributes()

    expect(Number(attrs.width)).toBe(500)
  })

  it(':autoresize', async function () {
    const wrapper = mount({
      render(h) {
        return h('div', [
          h(Artboard, {
            props: {
              autoresize: true
            }
          })
        ])
      }
    })
    const beforeWidth = wrapper.find('svg').attributes().width

    global.dispatchEvent(new Event('resize'))
    await sleep(200)
    expect(wrapper.find('svg').attributes().width).not.toBe(beforeWidth)
  })

  it(':padding - number', () => {
    const wrapper = mount(Artboard, {
      propsData: {
        padding: 20,
        width: 500,
        height: 300
      }
    })

    expect(wrapper.vm.canvas).toEqual({
      x0: 20,
      y0: 20,
      width: 460,
      height: 260,
      x1: 480,
      y1: 280
    })
  })

  it(':padding - array', () => {
    const wrapper = mount(Artboard, {
      propsData: {
        padding: [10, 20, 30, 40],
        width: 500,
        height: 300
      }
    })

    expect(wrapper.vm.canvas).toEqual({
      x0: 40,
      y0: 10,
      width: 440,
      height: 260,
      x1: 480,
      y1: 270
    })
  })

  it(':data', () => {})
})

describe('Slots', () => {
  it('matches snapshot', () => {
    const wrapper = mount(Artboard)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
