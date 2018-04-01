<template>
  <div id="app" >
    <spinner-loader v-if="loading"/>
    <app-header v-if="userLoggedIn"></app-header>
    <app-sidebar v-if="userLoggedIn"></app-sidebar>
    <div class="container main">
      <transition name="slide" mode="out-in">
        <router-view/>
      </transition>
    </div>
    <transition
      name="fadeIn"
      @enter="enterFadeIn"
      @leave="leaveFadeIn">
      <material-modal v-show="modalOpen"></material-modal>
    </transition>
    <response-popup/>
  </div>
</template>

<script>
import Velocity from 'velocity-animate'
import Header from './components/core/Header'
import Sidebar from './components/core/sidebar/Sidebar'
import Loader from './components/core/Loader'
import auth from './auth/auth'
import MaterialModal from './components/shared/MaterialModal'
import ResponsePopup from './components/shared/ResponsePopup'

export default {
  name: 'App',
  data () {
    return {
      open: false
    }
  },
  computed: {
    userLoggedIn () {
      return this.$store.getters.userLoggedIn
    },
    loading () {
      return this.$store.getters.loading('route')
    },
    modalOpen () {
      return this.$store.getters.open
    }
  },
  created () {
    const user = auth.getUser()
    if (user) {
      this.$store.commit('SET_USER', user)
    }
  },
  methods: {
    enterFadeIn (el, done) {
      Velocity(el,
        {
          opacity: [1, 0],
          duration: 300,
          complete: done
        })
    },
    leaveFadeIn (el, done) {
      Velocity(el,
        {
          opacity: [0, 1],
          duration: 300
        }, { complete: done })
    }
  },
  components: {
    appHeader: Header,
    appSidebar: Sidebar,
    spinnerLoader: Loader,
    materialModal: MaterialModal,
    responsePopup: ResponsePopup
  }
}
</script>
<style>
  @font-face {
      font-family: Raleway;
       src: url('./../static/themes/default/assets/fonts/fonts/Raleway-Regular.ttf');
  }
  html, body, #app {
    height: 100%;
  }
  body {
    font-size: 18px;
    font-family: Raleway;
    color: #212121;
    background-color: #F5F5F5;
  }
  button, input, optgroup, select, textarea {
    font-family: Raleway;
  }
  .main.container {
    margin-left: 12.7%;
    width: 87.3%;
    max-width: initial;
    padding: 1.5em 4.5em 0em;
    position: relative;
    /* min-height: calc(100vh - 96px); */
  }
  /* .content-wrapper {
    _min-height: calc(100vh - 116px);
  } */
  .container {
    width: 90%;
  }
  .offset-2 {
    margin-left: 12.5% !important;
  }
  .fade-enter {
    opacity: 0;
  }
  .fade-enter-active {
    transition: opacity 200ms ease-in;
  }
  .fade-leave-active {
    transition: opacity 200ms ease-in;
    opacity: 0;
  }

  .slide-enter-active {
    animation: slide-in 200ms ease-out forwards;
  }
  .slide-leave-active {
    animation: slide-out 200ms ease-out forwards;
  }
  .form-header {
    font-size: 25px;
    margin-top: 0;
  }
  .padding-0 {
    padding: 0 !important;
  }
  .relative-row {
    position: relative;
  }
  .loading.btn, .loading.btn-large {
    color: transparent;
  }
  .loading.btn:before, .loading.btn-large:before {
    position: absolute;
    content: '';
    top: 50%;
    left: 50%;
    margin: -0.842857em 0 0 -0.842857em;
    width: 1.785714em;
    height: 1.785714em;
    border-radius: 500rem;
    border: .2em solid rgba(0,0,0,.15);
  }
  .loading.btn:after, .loading.btn-large:after {
    position: absolute;
    content: '';
    top: 50%;
    left: 50%;
    margin: -0.842857em 0 0 -0.842857em;
    width: 1.785714em;
    height: 1.785714em;
    -webkit-animation: button-spin .6s linear;
    animation: button-spin .6s linear;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
    border-radius: 500rem;
    border-color: #fff transparent transparent;
    border-style: solid;
    border-width: .2em;
    -webkit-box-shadow: 0 0 0 1px transparent;
    box-shadow: 0 0 0 1px transparent;
  }
  @keyframes button-spin {
    from {
      -webkit-transform:rotate(0);
      transform:rotate(0)
    }
    to {
      -webkit-transform:rotate(360deg);
      transform:rotate(360deg)
    }
  }
  @keyframes slide-in {
    from {
      transform: translateY(-30px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  @keyframes slide-out {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(-30px);
      opacity: 0;
    }
  }
</style>
