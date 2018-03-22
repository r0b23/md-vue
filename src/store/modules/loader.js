/* eslint no-shadow: ["error", { "allow": ["state"] }] */
const state = {
  loader: {
    position: ''
  }
}
const mutations = {
  SHOW_LOADER (state, position) {
    state.loader.position = position
  },
  HIDE_LOADER (state) {
    state.loader = {
      position: ''
    }
  }
}
const getters = {
  loading (state) {
    return function (position) {
      if (state.loader.position === position) {
        return true
      }
      return false
    }
  }
}

export default {
  state,
  mutations,
  getters
}
