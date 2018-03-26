import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import users from './modules/users'
import modal from './modules/modal'
import error from './modules/error'
import loader from './modules/loader'
import response from './modules/responseMessage'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    auth,
    users,
    modal,
    error,
    loader,
    response
  }
})

export default store
