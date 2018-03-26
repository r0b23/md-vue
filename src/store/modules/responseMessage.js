const state = {
  popup: {
    showPopup: false,
    title: '',
    isError: false,
    message: ''
  }
}
const mutations = {
  openPopup (state, payload) {
    state.popup = payload
  },
  closePopup (state) {
    state.popup = {
      showPopup: false,
      title: '',
      isError: false,
      message: ''
    }
  }
}
const getters = {
  title (state) {
    return state.popup.title
  },
  isErrorResponse (state) {
    return state.popup.isError
  },
  getMessage (state) {
    return state.popup.message
  },
  showPopup () {
    return state.popup.showPopup
  }
}

export default {
  state,
  mutations,
  getters
}
