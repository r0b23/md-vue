<template>
  <div class="form-wrapper">
    <div class="row">
      <error-alert :hasError="submitError" :errorMessage="errorMessage"/>
      <form class="col s12" @submit.prevent="onSubmitEmployee">
        <mat-input
          v-model="employee.lastname"
          :inputWrapper="{s6: true}"
          label="Vezetéknév"
          name="lastname"
          :hasError="errors.has('lastname')"
          v-validate="'required'">
          <span
            class="error"
            v-if="errors.has('lastname')">
              {{ errors.first('lastname') }}
          </span>
        </mat-input>
        <mat-input
          v-model="employee.firstname"
          :inputWrapper="{s6: true}"
          label="Keresztnév"
          name="firstname"
          :hasError="errors.has('firstname')"
          v-validate="'required'">
          <span
            class="error"
            v-if="errors.has('firstname')">
              {{ errors.first('firstname') }}
          </span>
        </mat-input>
        <mat-input
          :disabled="editing"
          v-model="employee.email"
          :inputWrapper="{s6: true}"
          type="email"
          label="Email"
          name="email"
          :hasError="errors.has('email')"
          v-validate="'required|email'">
          <span
            class="error"
            v-if="errors.has('email')">
              {{ errors.first('email') }}
          </span>
        </mat-input>
        <mat-input
          v-model="employee.phoneNumber"
          :inputWrapper="{s6: true}"
          label="Telefonszám"
          name="phoneNumber"
          :hasError="errors.has('phoneNumber')"
          v-validate="validations.name">
          <span
            class="error"
            v-if="errors.has('phoneNumber')">
              {{ errors.first('phoneNumber') }}
          </span>
        </mat-input>
        <mat-input
          v-if="!editing"
          v-model.trim="employee.password"
          :inputWrapper="{s12: true}"
          type="password"
          label="Jelszó"
          name="password"
          :hasError="errors.has('password')"
          v-validate="validations.password">
           <span
            class="error"
            v-if="errors.has('password')">
              {{ errors.first('password') }}
          </span>
        </mat-input>
        <mat-select
          v-model="employee.authority"
          :inputWrapper="{s12: true}"
          :options="selectOptions"
          name="userRole"
          v-validate="'required'"
          label="Felhasználó tipusa"/>
        <mat-radio-button
          id="userType"
          v-model="employee.student"
          :inline="true"
          :buttons="radioOption"
          v-validate="'required'"
          name="userType"/>
        <mat-date-picker
          :disabled="editing"
          :inputWrapper="{s12: true}"
          id="datepicker"
          name="birthdate"
          label="Születési Dátum"
          v-model="employee.birthdate"
          v-validate="'required'"/>
        <p class="right-align col s12">
          <button
            type="button"
            class="waves-effect waves-light btn center-align red"
            @click="closeModal">
            Mégse
          </button>
          <button
            type="submit"
            class="waves-effect waves-light btn center-align"
            :class="loading"
            :disabled="isFormValid">
            Munkavállaló mentése
          </button>
        </p>
      </form>
    </div>
  </div>
</template>
<script>
import MatInput from '../../shared/forms/MatInput'
import MatSelect from '../../shared/forms/MaterialSelect'
import MatRadioButton from '../../shared/forms/MaterialRadioButton'
import MatDatePicker from '../../shared/forms/MatDatepicker'
import ErrorAlert from '../../shared/ErrorAlert'

export default {
  data () {
    return {
      validations: {
        name: {
          required: true
        },
        email: {
          required: true,
          email: true
        },
        phone: {
          required: true
          // regex: /^\+[0-9]{1}[0-9]{10,11}$/
        },
        password: {
          required: true
        }
      },
      employee: {
        lastname: '',
        firstname: '',
        email: '',
        password: '',
        authority: null,
        student: true,
        phoneNumber: '',
        birthdate: ''
      },
      selectOptions: [
        { value: 0, displayValue: 'Admin' },
        { value: 1, displayValue: 'Project vezető' },
        { value: 2, displayValue: 'Asszisztens' },
        { value: 3, displayValue: 'Diák/EFO' }
      ],
      radioOption: [
        { value: true, displayValue: 'Diák' },
        { value: false, displayValue: 'EFO' }
      ]
    }
  },
  computed: {
    isFormValid () {
      return Object.keys(this.fields).some(key => this.fields[key].invalid)
    },
    submitError () {
      return this.$store.getters.isError('newUserSubmit')
    },
    errorMessage () {
      return this.$store.getters.errorMessage
    },
    loading () {
      return {
        loading: this.$store.getters.loading('newUser')
      }
    },
    editing () {
      return this.$store.getters.editing
    }
  },
  methods: {
    onSubmitEmployee () {
      if (this.editing) {
        this.$store.dispatch('updateUser', this.employee)
      } else {
        this.employee.phonenumber = this.employee.phoneNumber
        this.$store.dispatch('addUser', this.employee)
      }
    },
    closeModal () {
      this.$store.commit('closeModal')
    }
  },
  created () {
    const modalModel = this.$store.getters.model
    if (modalModel) {
      this.employee = modalModel
    }
  },
  components: {
    matInput: MatInput,
    matSelect: MatSelect,
    matRadioButton: MatRadioButton,
    matDatePicker: MatDatePicker,
    errorAlert: ErrorAlert
  }
}
</script>
<style>

</style>
