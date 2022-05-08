import Vue from 'vue'
import Vuex from 'vuex'
import ApiService from '@/services/api.service'

Vue.use(Vuex)

//load Vuex
Vue.use(Vuex)

//to handle state
const state = {
  books: [],
  isBusy: false,
  booksFetchIndex: {
    start: 0,
    end: 0,
    pageIndex: 0,
  },
}

//to handle state
const getters = {
  books(state) {
    return state.books
  },
  isBusy(state) {
    return state.isBusy
  },
  pageIndex(state) {
    return state.booksFetchIndex.pageIndex
  },
}

//to handle actions
const actions = {
  getBooks({ commit, state }) {
    commit('INCREMENT_BOOKS_FETCH_INDEX')
    commit('TOGGLE_BUSY')
    setTimeout(() => {
      ApiService.get(
        `/books?_start=${state.booksFetchIndex.start}&_end=${state.booksFetchIndex.end}`
      ).then((response) => {
        commit('SET_BOOKS', response.data)
      })
      commit('TOGGLE_BUSY')
    }, 1500)
  },

  prevBooks({ commit, state }) {
    commit('DECREMENT_BOOKS_FETCH_INDEX')
    commit('TOGGLE_BUSY')
    setTimeout(() => {
      ApiService.get(
        `/books?_start=${state.booksFetchIndex.start}&_end=${state.booksFetchIndex.end}`
      ).then((response) => {
        commit('SET_BOOKS', response.data)
      })
      commit('TOGGLE_BUSY')
    }, 1500)
  },
}

//to handle mutations
const mutations = {
  SET_BOOKS(state, posts) {
    state.books = posts
  },
  TOGGLE_BUSY(state) {
    state.isBusy = !state.isBusy
  },
  INCREMENT_BOOKS_FETCH_INDEX(state) {
    state.booksFetchIndex = {
      start: state.booksFetchIndex.end,
      end: state.booksFetchIndex.end + 5,
      pageIndex: state.booksFetchIndex.pageIndex + 1,
    }
  },
  DECREMENT_BOOKS_FETCH_INDEX(state) {
    /*Double check, to be on safe side, we do not
     * want to go under 0
     * */
    if (state.booksFetchIndex.start !== 0) {
      state.booksFetchIndex = {
        start: state.booksFetchIndex.start - 5,
        end: state.booksFetchIndex.start,
        pageIndex: state.booksFetchIndex.pageIndex - 1,
      }
    }
  },
}

//export store module
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
})
