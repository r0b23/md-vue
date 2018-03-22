<template>
    <div class="row login-container">
      <div class="flex-item card-panel">
        <form class="col s12" id="loginForm" @submit.prevent="onLogin">
          <error-alert :hasError="hasError" :errorMessage="errorMessage"/>
          <h3 class="center-align">Bejelentkezés</h3>
          <div class="row">
            <mat-input
              v-model="username"
              :inputWrapper="{s12: true}"
              :icon="'email'"
              :type="'email'"
              :label="'Email'"
              :name="'email'"
              :hasError="errors.has('email')"
              v-validate="validations.userName"
              data-vv-delay="1500">
              <span
                class="error"
                v-if="errors.has('email')">
                  {{ errors.first('email') }}
              </span>
            </mat-input>
            <mat-input
              :label="'Jelszó'"
              :id="'password'"
              :icon="'lock'"
              :inputWrapper="{s12: true}"
              :type="'password'"
              v-model="password"
              :name="'password'"
              :hasError="errors.has('password')"
              v-validate="validations.password">
              <span
                class="error"
                v-if="errors.has('password')">
                  {{ errors.first('password') }}
              </span>
            </mat-input>
            <div class="input-field col s12">
              <p class="center-align">
                <button
                  class="waves-effect waves-light btn-large center-align"
                  :class="loading"
                  :disabled="isFormValid">
                  Belépés
                </button>
              </p>
            </div>
          </div>
          <div class="ui error message"></div>
        </form>
        <p class="center-align"><a href="signin.html#/pages/forgot">Elfelejtett jeszó?</a></p>
      </div>
  </div>
</template>
<script>
import auth from '../../../auth/auth'
import MatInput from '../../shared/forms/MatInput'
import ErrorAlert from '../../shared/ErrorAlert'

export default {
  data () {
    return {
      username: '',
      password: '',
      validations: {
        userName: {
          required: true,
          email: true
        },
        password: {
          required: true
        }
      }
    }
  },
  computed: {
    isFormValid () {
      return Object.keys(this.fields).some(key => this.fields[key].invalid)
    },
    errorMessage () {
      return this.$store.getters.errorMessage
    },
    hasError () {
      return this.$store.getters.isError('login')
    },
    loading () {
      return {
        loading: this.$store.getters.loading('login')
      }
    }
  },
  methods: {
    onLogin () {
      const body = {
        username: this.username,
        password: this.password
      }
      auth.login(body)
    }
  },
  components: {
    matInput: MatInput,
    errorAlert: ErrorAlert
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
  .row .col.s12#loginForm {
    max-width: 450px;
    margin: 0;
  }
  i.error {
    color: #F44336;
  }
  .input-field:last-of-type {
    margin-bottom: 2rem;
  }
</style>
