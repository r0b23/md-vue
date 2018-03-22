<template>
  <div class="input-field col" :class="inputWrapper">
    <i
      class="material-icons prefix"
      :class="{ error: hasError }"
      v-if="icon">{{ icon }}</i>
    <input
      :type="type"
      class="validate"
      :class="{ 'invalid': hasError }"
      :value="value"
      @input="inputValue($event.target.value)"
      @focus="inputIsActive"
      @blur="inputNotActive"
      :disabled="disabled"
      :id="id || name"
      :name="name"
      :required="required">
    <label
      :for="id"
      :class="{ active: value || inputActive, paddingLeft: icon }">
      {{ label }}
    </label>
    <div class="error-wrapper"
      :class="{ paddingLeft: icon }">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      inputActive: false
    }
  },
  props: {
    inputWrapper: {
      type: Object,
      required: true
    },
    value: {
      required: true
    },
    type: {
      type: String,
      required: true
    },
    icon: {
      type: String
    },
    label: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      required: false
    },
    required: {
      type: Boolean,
      required: false
    },
    name: {
      type: String,
      required: true
    },
    id: {
      type: String
    },
    hasError: {
      type: Boolean
    }
  },
  methods: {
    inputIsActive () {
      this.inputActive = true
    },
    inputNotActive () {
      this.inputActive = false
    },
    inputValue (value) {
      this.$emit('input', value)
    }
  }
}
</script>
<style>
  span.error {
    display: inline-block;
    font-size: 11px;
    margin-top: 10px;
    color: #F44336;
    position: absolute;
    top: 45px;
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
  i.error {
    color: #F44336;
  }
  input[type=email]:not(.browser-default),
  input[type=password]:not(.browser-default),
  input[type=text]:not(.browser-default) {
    margin-bottom: 1.5em;
  }
  div.paddingLeft span.error{
    padding-left: 3rem;
  }
</style>
