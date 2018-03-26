// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import VeeValidate, { Validator } from 'vee-validate'
import hu from 'vee-validate/dist/locale/hu'
import App from './App'
import router from './router'
import auth from './auth/auth'
import store from './store/index'
import 'materialize-css'

Vue.use(VueResource)

Vue.http.options.root = 'http://localhost:9090/'
Vue.http.interceptors.push((request, next) => {
  // console.log(request)
  if (auth.isLoggedIn()) {
    request.headers.set('Authorization', `Bearer ${auth.getToken()}`)
  }
  next()
  return function (response) {
    if (response.status === 401) {
      store.commit('logout')
      router.push('/bejelentkezes')
    }
  }
})
router.beforeEach((to, from, next) => {
  if (to.path !== '/bejelentkezes') {
    if (!auth.isLoggedIn() && from.path !== '/login') {
      store.commit('logout')
      next('/bejelentkezes')
    } else if (from.path === '/bejelentkezes' && !auth.isLoggedIn()) {
      next(false)
    } else {
      next()
    }
  } else {
    next()
  }
})

Validator.localize('hu', hu)
Vue.use(VeeValidate)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
