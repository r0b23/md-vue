<template>
  <div class="navbar-fixed">
    <nav>
      <div class="nav-wrapper blue lighten-1">
        <router-link to="/" class="brand-logo">MelóDiák ALPHA</router-link>
        <ul class="right hide-on-med-and-down">
          <li><a><i class="material-icons" title="Értesítések">notifications</i></a></li>
          <li><a><i class="material-icons" title="Képernyő zárolása">lock</i></a></li>
          <li>
            <a @click.prevent="logout()">
              <i class="material-icons" title="Kilépés">arrow_forward</i>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
<script>
import auth from '../../auth/auth'

export default {
  methods: {
    logout () {
      auth.logout()
      this.$store.commit('logout')
    }
  }
}
</script>

<style>
  .nav-wrapper {
    padding: 0 20px;
  }

  nav .brand-logo, nav ul a {
    color: #fff;
  }
  nav .brand-logo {
    font-size: 1.8rem;
}
</style>
