<template>
  <ul id="slide-out" class="side-nav">
    <sidebar-user/>
    <li>
      <router-link to="/munkavallalok">
        <i class="material-icons dp48">group</i>
        Munkavállalók
      </router-link>
    </li>
    <li>
      <router-link to="/munkahelyek">
        <i class="material-icons dp48">work</i>
        Munkahelyek
      </router-link>
    </li>
    <li>
      <router-link to="/projektjeim">
        <i class="material-icons dp48">playlist_add_check</i>
        Projektek
      </router-link>
    </li>
    <li><div class="divider"></div></li>
    <li><router-link class="waves-effect" to="/sandbox">Sandbox</router-link></li>
  </ul>
</template>
<script>
import SidebarUserDetail from './SidebarUserDetail'
import auth from '../../../auth/auth'

export default {
  components: {
    sidebarUser: SidebarUserDetail
  },
  methods: {
    logout () {
      auth.logout()
      this.$store.commit('logout')
    }
  }
}
</script>
<style>
  .side-nav {
    transform: initial;
    top: 64px;
    background: #fff;
    width: 240px;
  }
  .side-nav li>a, .side-nav .subheader, .side-nav li>a>i.material-icons {
    color: #444;
    font-size: 18px;
  }
  .side-nav li>a>i.material-icons {
    margin: 0 5px 0 0;
    color: #444;
  }
  .side-nav li>a {
    display: block;
    padding: 0 15px;
    color: #444;
  }
</style>
