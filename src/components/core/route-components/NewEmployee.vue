<template>
  <div class="form-wrapper">
    <div class="row">
      <error-alert :hasError="submitError" :errorMessage="errorMessage"/>
      <form class="col s12" @submit.prevent="onSubmitEmployee">
        <mat-input
          v-model="newEmployee.lastname"
          :inputWrapper="{s6: true}"
          :type="'text'"
          :label="'Vezetéknév'"
          :name="'lastname'"
          v-validate="validations.name"
        />
        <mat-input
          v-model="newEmployee.firstname"
          :inputWrapper="{s6: true}"
          :type="'text'"
          :label="'Keresztnév'"
          :name="'firstname'"
          v-validate="validations.name"
        />
        <mat-input
          v-model="newEmployee.email"
          :inputWrapper="{s6: true}"
          :type="'email'"
          :label="'Email'"
          :name="'email'"
          :hasError="errors.has('email')"
          v-validate="validations.email"
        />
        <mat-input
          v-model="newEmployee.phoneNumber"
          :inputWrapper="{s6: true}"
          :type="'text'"
          :label="'Telefonszám'"
          :name="'phoneNumber'"
          v-validate="validations.phone">
          <span
            class="error"
            v-if="errors.has('phoneNumber')">
              {{ errors.first('phoneNumber') }}
          </span>
        </mat-input>
        <mat-input
          v-if="!editing"
          v-model="newEmployee.password"
          :inputWrapper="{s12: true}"
          :type="'password'"
          :label="'Jelszó'"
          :name="'password'"
        />
        <mat-select
          v-if="!editing"
          v-model="newEmployee.authority"
          :inputWrapper="{s12: true}"
          :options="selectOptions"
          :name="'userRole'"
          :label="'Felhasználó tipusa'"
        />
        <mat-radio-button
          :id="'userType'"
          v-model="newEmployee.student"
          :inline="true"
          :buttons="radioOption"
          :name="'hoho'"
        />
        <mat-date-picker
          :inputWrapper="{s12: true}"
          :id="'datepicker'"
          :label="'Születési Dátum'"
          v-model="newEmployee.birthdate"
          v-validate="'required'"
        />
        <p class="right-align col s12">
          <button
            type="submit"
            class="waves-effect waves-light btn center-align"
            :class="loading"
            :disabled="isFormValid">
            Munkavállaló mentése
          </button>
          <button
            type="button"
            class="waves-effect waves-light btn center-align red"
            @click="closeModal">
            Mégse
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
        }
      },
      newEmployee: {
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
      let body = {
        lastname: this.newEmployee.lastname,
        firstname: this.newEmployee.firstname,
        email: this.newEmployee.email,
        password: 'this.newEmployee.password',
        authority: /* this.newEmployee.authority */ 2,
        student: this.newEmployee.student,
        phonenumber: this.newEmployee.phoneNumber,
        birthdate: this.newEmployee.birthdate
      }
      if (this.editing) {
        body.id = this.newEmployee.id
        this.$store.dispatch('updateUser', body)
      } else {
        this.$store.dispatch('addUser', body)
      }
    },
    closeModal () {
      this.$store.commit('closeModal')
    }
  },
  created () {
    const modalModel = this.$store.getters.model
    if (modalModel) {
      this.newEmployee = modalModel
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
