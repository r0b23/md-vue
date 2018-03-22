import Vue from 'vue'
import decode from 'jwt-decode'
import router from '../router/index'
import store from '../store/index'
import sleeper from '../mixins/index'

const ACCESS_TOKEN = 'ACCESS_TOKEN'

export default {
  user: {},
  isLoggedIn () {
    const token = this.getToken()
    return !!token && !this.isTokenExpired(token)
  },
  getToken () {
    return localStorage.getItem(ACCESS_TOKEN)
  },
  setToken (token) {
    localStorage.setItem(ACCESS_TOKEN, token)
  },
  clearToken () {
    localStorage.removeItem(ACCESS_TOKEN)
  },
  getTokenExpirationDate (encodedToken) {
    const token = decode(encodedToken)
    if (!token.exp) { return null }

    const date = new Date(0)
    date.setUTCSeconds(token.exp)
    return date
  },
  isTokenExpired (token) {
    const expirationDate = this.getTokenExpirationDate(token)
    return expirationDate < new Date()
  },
  login (body) {
    store.commit('SHOW_LOADER', 'login')
    Vue.http.post('http://localhost:9090/auth', body).then(response => response.json())
      .then(sleeper(1000))
      .then((data) => {
        this.setToken(data.token)
        Vue.http.get('http://localhost:9090/user/authenticate').then(response => response.json())
          .then((user) => {
            this.saveUserToLocalStorage(user)
            store.commit('SET_USER', user)
            store.commit('RESET_ERROR')
            store.commit('HIDE_LOADER')
            router.push('/')
          })
      })
      .catch(() => {
        store.commit('SET_ERROR',
          {
            message: 'Hibás felhasználónév vagy jelszó!',
            status: 401,
            position: 'login'
          }
        )
      })
  },
  logout () {
    this.clearToken()
    this.clearUser()
    store.commit('logout')
    router.push('/bejelentkezes')
  },
  saveUserToLocalStorage (user) {
    localStorage.setItem('user', JSON.stringify(user))
  },
  getUser () {
    return JSON.parse(localStorage.getItem('user'))
  },
  clearUser () {
    localStorage.removeItem('user')
  }
}
