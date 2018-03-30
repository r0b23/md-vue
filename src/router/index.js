import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/core/route-components/Login.vue'
import Dashboard from '../components/core/route-components/Dashboard'
import Employies from '../components/core/route-components/Employies'
import Employee from '../components/core/route-components/Employee.vue'
import Projects from '../components/core/route-components/Projects.vue'
import Workplaces from '../components/core/route-components/Workplaces.vue'
import Sandbox from '../components/Sandbox.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '', component: Dashboard },
    { path: '/bejelentkezes', component: Login },
    { path: '/munkavallalok', component: Employies },
    { path: '/munkavallalok/:id', component: Employee },
    { path: '/projektjeim', component: Projects },
    { path: '/munkahelyek', component: Workplaces },
    { path: '/sandbox', component: Sandbox }
  ]
})
