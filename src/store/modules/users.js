/* eslint no-shadow: ["error", { "allow": ["state"] }] */
import Vue from 'vue'
import sleeper from '../../mixins/index'

const state = {
  users: []
}

const mutations = {
  SET_USERS (state, users) {
    state.users = users
    state.userLoading = false
  },
  UPDATE_USER (state, user) {
    const oldUser = state.users.find(u => u.id === user.id)
    const index = state.users.indexOf(oldUser)
    Vue.set(state.users, index, user)
  },
  ADD_NEW_USER (state, newUser) {
    state.users.push(newUser)
  }
}

const actions = {
  fetchUsers ({ commit }, userType) {
    commit('SHOW_LOADER', 'userLoading')
    Vue.http.get(`http://localhost:9090/user/all/${userType}`).then(response => response.json())
      .then(sleeper(1000))
      .then((users) => {
        commit('SET_USERS', users)
        commit('HIDE_LOADER')
      }).catch(error => console.log(error))
  },
  addUser ({ commit }, user) {
    // show loader on button or somwhere
    commit('SHOW_LOADER', 'newUser')
    Vue.http.post('http://localhost:9090/user/insert', user).then(response => response.json())
      .then(newUser => {
        commit('HIDE_LOADER')
        commit('ADD_NEW_USER', newUser)
        commit('closeModal')
      }).catch(error => {
        console.log(error)
        const payload = {
          message: error.body.message,
          status: error.status,
          position: 'newUserSubmit'
        }
        commit('SET_ERROR', payload)
      })
  },
  removeUser ({commit}, userId) {
    const deleteUserUrl = `http://localhost:9090/user/remove/${userId}`
    console.log(userId)
    Vue.http.delete(deleteUserUrl).then(response => response.json())
      .then(serverResponse => {
        console.log(serverResponse)
      }).catch(error => console.log(error))
  },
  updateUser ({ commit }, user) {
    console.log(user)
    Vue.http.post('http://localhost:9090/user/update', user).then(response => response.json())
      .then(updatedUser => {
        console.log(updatedUser)
      })
  }
}

const getters = {
  users (state) {
    return state.users
  },
  userLoading (state) {
    return state.userLoading
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}
