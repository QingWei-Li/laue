const {Artboard} = require('../dist/laue.umd')
const {mount} = require('@vue/test-utils')

describe('Object:Artboard', () => {
  it(':data', () => {
    const wrapper = mount(Artboard)
    console.log(wrapper)
  })

  it('matches snapshot', () => {
    const wrapper = mount(Artboard)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
