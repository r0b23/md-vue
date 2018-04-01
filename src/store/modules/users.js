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
    const userResource = UserResource()
    commit('SHOW_LOADER', 'userLoading')
    userResource.getUsers({ userType }).then(response => response.json())
      .then(sleeper(1000)).then(users => {
        userResource.populateUsers(users).then(populatedUsers => {
          commit('SET_USERS', populatedUsers)
          commit('HIDE_LOADER')
        })
      }).catch(error => console.log(error))
  },
  addUser ({ commit }, user) {
    commit('SHOW_LOADER', 'newUser')
    const userResource = UserResource()
    userResource.saveUser(user).then(response => response.json())
      .then(newUser => {
        userResource.populateUser(newUser.id).then(populatedUser => {
          commit('HIDE_LOADER')
          commit('ADD_NEW_USER', populatedUser)
          commit('closeModal')
          const payload = {
            showPopup: true,
            title: 'Új munkválló hozzáadva.',
            isError: false,
            message: `Új felhasználó: ${populatedUser.name}`
          }
          commit('openPopup', payload)
        })
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
    const userResource = UserResource()
    userResource.deleteUser({ userId }).then(response => response.json())
      .then(users => {
        userResource.populateUsers(users).then(populatedUsers => {
          const payload = {
            showPopup: true,
            title: 'Felhasználó törölve.',
            isError: false,
            message: ``
          }
          commit('openPopup', payload)
          commit('SET_USERS', populatedUsers)
          commit('closeModal')
        })
      }).catch(error => console.log(error))
  },
  updateUser ({ commit }, user) {
    const userResource = UserResource()
    userResource.updateUser(user).then(response => response.json())
      .then(updatedUser => {
        userResource.populateUser(updatedUser.id).then(populatedUser => {
          const payload = {
            showPopup: true,
            title: 'Felhasználó módosítva.',
            isError: false,
            message: ``
          }
          commit('openPopup', payload)
          commit('UPDATE_USER', user)
          commit('closeModal')
        })
      })
  },
  addUserToProject ({ commit }, payload) {
    const userResource = UserResource()
    userResource.addUserToProject(payload, null).then(user => {
      userResource.populateUser(payload.userId).then(populatedUser => {
        const popupPayload = {
          showPopup: true,
          title: 'Sikeres művelet.',
          isError: false,
          message: `${populatedUser.name} hozzáadva a ${populatedUser.projects[0].name} projekthez.`
        }
        commit('openPopup', popupPayload)
        commit('UPDATE_USER', populatedUser)
      }).catch(error => console.log(error)) // hiba kezelés hozzáadáasa
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
