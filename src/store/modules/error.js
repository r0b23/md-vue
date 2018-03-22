const state = {
  error: {}
}

const getters = {
  errorMessage (state) {
    return state.error.message
  },
  isError (state) {
    return function (position) {
      if (state.error.position === position) {
        return true
      }
      return false
    }
  },
  errorStatus (state) {
    return state.error.status
  }
}

const mutations = {
  SET_ERROR (state, payload) {
    state.error = payload
  },
  RESET_ERROR (state) {
    state.error = {}
  }
}

export default {
  state,
  mutations,
  getters
}
