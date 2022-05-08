import { createLocalVue, shallowMount, mount } from '@vue/test-utils'
import Vuex from 'vuex'
import BookTableBase from '@/components/BookTableBase'
import BootstrapVue from 'bootstrap-vue'
const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(BootstrapVue)
const fields = [
  {
    key: 'title',
    label: 'TITLE',
    sortable: false,
  },
]
const items = [
  {
    id: 0,
    author: 'Harriet Kub IV',
    title: 'Generic Rubber Cheese',
    details:
      'Nihil a in voluptas sed harum sit quae quisquam quis ut dolor consequatur nulla vero voluptatem sit laboriosam est omnis hic ea tenetur omnis eos fugit beatae omnis atque voluptatem aut unde eos officia in earum iste doloremque est voluptatem dicta autem odio et quia consequatur quidem laborum velit nobis in quis possimus voluptate omnis odio exercitationem autem sapiente atque molestias sapiente fugiat error necessitatibus exercitationem consequatur eos dolore ut officia dicta voluptatem et distinctio voluptates similique blanditiis sed nulla voluptatum perferendis voluptatem recusandae labore dicta est consequuntur et repudiandae aut debitis aut ducimus dolorem et et laborum saepe rerum.',
    avatar: 'http://loremflickr.com/200/200/animals?57546',
    genre: 'Industrial',
    rating: '9.2',
    published: '2014',
    buy_on: 'Collins - Tremblay',
  },
]
const busy = false
const tableHeader = 'Most popular Books of All time'

describe('BookBuyOn.vue', () => {
  it('All required props', () => {
    const wrapper = shallowMount(BookTableBase, {
      localVue,
      propsData: { items, busy, tableHeader, fields },
    })
    expect(wrapper.props()).toStrictEqual({ items, busy, tableHeader, fields })
  })
})
