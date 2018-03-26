/* eslint no-shadow: ["error", { "allow": ["state"] }] */
import Vue from 'vue'
import sleeper from '../../mixins/index'
import UserResource from '../../resources/UserResource'

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
    console.log(UserResource)
    commit('SHOW_LOADER', 'userLoading')
    UserResource.getUsers({ userType }).then(response => response.json())
      .then(sleeper(1000)).then(users => {
        commit('SET_USERS', users)
        commit('HIDE_LOADER')
      }).catch(error => console.log(error))
  },
  addUser ({ commit }, user) {
    commit('SHOW_LOADER', 'newUser')
    UserResource.saveUser(user).then(response => response.json())
      .then(newUser => {
        commit('HIDE_LOADER')
        commit('ADD_NEW_USER', newUser)
        commit('closeModal')
        const payload = {
          showPopup: true,
          title: 'Új munkválló hozzáadva.',
          isError: false,
          message: `Új felhasználó: ${newUser.lastname}`
        }
        commit('openPopup', payload)
      }).catch(error => {
        const payload = {
          showPopup: true,
          title: 'Hiba történt',
          isError: true,
          message: error.body.message
        }
        commit('HIDE_LOADER')
        commit('openPopup', payload)
      })
  },
  removeUser ({ commit }, userId) {
    // const deleteUserUrl = `user/remove/${userId}`
    UserResource.deleteUser({userId}).then(response => response.json())
      .then(users => {
        const payload = {
          showPopup: true,
          title: 'Felhasználó törölve.',
          isError: false,
          message: ``
        }
        commit('SET_USERS', users)
        commit('openPopup', payload)
      }).catch(error => console.log(error))
  },
  updateUser ({ commit }, user) {
    Vue.http.post('user/update', user).then(response => response.json())
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
