<template>
    <div class="row login-container" v-if="!loading">
      <div class="flex-item card-panel">
        <form class="col s12" id="unlockForm" @submit.prevent="onUnLock">
          <p v-if="hasError" class="login-error">
            <i class="material-icons prefix">error</i>
            {{ errorMessage }}
          </p>
          <div class="row">
            <div class="input-field col s12">
              <h4 class="header center-align">{{ userNameToUppercase }}</h4>
              <i class="material-icons prefix" :class="{ 'error': errors.has('password') }">lock</i>
              <input
                type="password"
                class="validate"
                :class="{ 'invalid': errors.has('password') }"
                placeholder="Jelszó"
                name="password"
                v-validate="'required'"
                data-vv-as="jelszó"
                v-model="password">
                <span
                  class="error"
                  v-if="errors.has('password')">
                    {{ errors.first('password') }}
                </span>
            <p class="center-align">
              <button
                class="waves-effect waves-light center-align btn"
                :disabled="!isCompleted || errors.any()">
                Feloldás
                </button>
            </p>
            </div>
          </div>
        </form>
      </div>
  </div>
</template>
<script>
import auth from '../../auth/auth'

export default {
  data () {
    return {
      password: null,
      userFromServer: {},
      token: ''
    }
  },
  computed: {
    isCompleted () {
      return !!this.username && !!this.password
    },
    errorMessage () {
      return this.$store.getters.errorMessage
    },
    hasError () {
      return this.$store.getters.hasError
    },
    loading () {
      return this.$store.getters.loading
    },
    username () {
      return this.$store.getters.user.email
    },
    userNameToUppercase () {
      const userName = `
        ${this.$store.getters.user.lastname}
         ${this.$store.getters.user.firstname}`
      return userName
    }
  },
  methods: {
    onUnLock () {
      const body = {
        username: this.username,
        password: this.password
      }
      auth.login(body)
    }
  }
}
</script>
<style>
  .container .row.login-container {
    height: 100%;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    align-items: center;
    justify-content: center;
    background-color: #00bcd4 !important;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
  }
  .flex-item {
    margin-top: -12em;
  }
  #unlockForm {
    width: 280px;
    height: 330px;
  }
  .row .col.s12#loginForm {
    max-width: 450px;
    margin: 0;
  }
  input[type=email]:not(.browser-default), input[type=password]:not(.browser-default) {
    height: 2rem;
    margin-bottom: 2em;
  }
  i.error {
    color: #F44336;
  }
  span.error {
    display: inline-block;
    font-size: 11px;
    margin-top: 5px;
    color: #F44336;
    padding-left: 3rem;
    position: absolute;
    top: 115px;
  }
  .input-field:last-of-type {
    margin-bottom: 2rem;
  }
  p.login-error {
    background-color: #F44336;
    color:white;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5em;
  }
  p.login-error i.material-icons {
    margin-right: .5em;
  }
  h4.header {
    line-height: 2.508rem;
    margin: 1.14rem 0 1.9rem 0;
    font-size: 1.4rem;
    font-weight: 400;
    text-transform: uppercase;
}
</style>
