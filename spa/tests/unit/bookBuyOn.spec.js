import { shallowMount } from '@vue/test-utils'
import BookBuyOn from '@/components/BookBuyOn'
describe('BookBuyOn.vue', () => {
  it('renders props.msg when passed', () => {
    const buyOn = 'new message'
    const wrapper = shallowMount(BookBuyOn, {
      propsData: { buyOn },
    })
    expect(wrapper.text()).toMatch(buyOn)
  })
})
