/* eslint no-shadow: ["error", { "allow": ["state"] }] */

const state = {
  open: false,
  modalComponent: null,
  modalHeader: '',
  showFooter: false,
  model: null,
  editing: false,
  size: '',
  action: null
}

const mutations = {
  closeModal (state) {
    state.open = false
  },
  openModal (state, payload) {
    state.open = true
    state.modalComponent = payload.component
    state.modalHeader = payload.header
    state.model = { ...payload.model }
    state.showFooter = payload.showFooter
    state.editing = payload.editing
    state.size = payload.size
    state.action = payload.action
  }
}
const getters = {
  open (state) {
    return state.open
  },
  modalComponent (state) {
    return state.modalComponent
  },
  modalHeader (state) {
    return state.modalHeader
  },
  showFooter (state) {
    return state.showFooter
  },
  model (state) {
    return state.model
  },
  editing (state) {
    return state.editing
  },
  size (state) {
    return state.size
  },
  action (state) {
    return state.action
  }
}
export default {
  state,
  mutations,
  getters
}
