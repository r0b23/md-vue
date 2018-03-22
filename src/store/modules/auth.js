/* eslint no-shadow: ["error", { "allow": ["state"] }] */
const state = {
  user: {}
}
const mutations = {
  SET_USER (state, payload) {
    state.error = {}
    state.user = payload
  },
  logout (state) {
    state.user = {}
  }
}
const getters = {
  user (state) {
    return state.user
  },
  userLoggedIn (state) {
    const user = state.user
    return Object.keys(user).length > 0
  }
}

export default {
  state,
  mutations,
  getters
}
