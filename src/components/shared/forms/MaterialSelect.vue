<template>
  <div class="input-field col" :class="inputWrapper">
    <div class="select-wrapper">
      <span class="caret">▼</span>
      <input
        type="text"
        class="select-dropdown"
        :class="{ 'invalid': hasError }"
        :value="displayValue"
        @input="inputValue($event.target.value)"
        :disabled="disabled"
        :id="id || name"
        :name="name"
        @click="openDropdown"
        :readonly="'true'" ref="myInput">
        <transition
          mode="in-out"
          :css="false"
          name="slideToggle"
          @enter="enter"
          @leave="leave">
          <ul
            class="dropdown-content select-dropdown"
            v-if="show"
            v-click-outside="closeDropdown"
            :style="width">
            <li class="disabled"
            @click="selectDefault" v-if="label">
              <span>{{ label }}</span>
            </li>
            <li
              v-for="option in options"
              :key="option.value"
              @click="selectValue(option.value)">
              <span>
                {{ option.displayValue }}
              </span>
            </li>
          </ul>
        </transition>
    </div>
  </div>
</template>
<script>
import ClickOutside from 'vue-click-outside'
import Velocity from 'velocity-animate'

export default {
  data () {
    return {
      myInputWidth: 0,
      show: false
    }
  },
  mounted () {
    this.myInputWidth = this.$refs.myInput.clientWidth
  },
  computed: {
    width () {
      return {
        width: `${this.myInputWidth}px`
      }
    },
    displayValue () {
      const selectedOption = this.options.find(option => this.value === option.value)
      if (selectedOption) {
        return selectedOption.displayValue
      }
      return this.label
    }
  },
  methods: {
    openDropdown () {
      this.show = true
    },
    closeDropdown () {
      this.show = false
    },
    enter (el, done) {
      Velocity(el, 'slideDown', { duration: 200, complete: done })
    },
    leave (el, done) {
      Velocity(el, { opacity: 0 }, { duration: 200, complete: done })
    },
    selectValue (value) {
      this.$emit('input', value)
      this.show = false
    },
    selectDefault () {
      this.show = false
      if (this.defaultValue !== undefined) {
        this.$emit('input', this.defaultValue)
      } else {
        this.$emit('input', null)
      }
    },
    setDropdownWidth () {
      this.myInputWidth = this.$refs.myInput.clientWidth
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
    },
    options: {
      type: Array,
      required: true
    },
    defaultValue: {
      type: Number
    }
  },
  directives: {
    ClickOutside
  },
  created () {
    window.addEventListener('resize', this.setDropdownWidth)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.setDropdownWidth)
  }
}
</script>
<style>
  ul.dropdown-content.select-dropdown {
    top: 0px;
    left: 0px;
    display: block;
    opacity: 1;
  }
  ul.select-options li {
    clear: both;
    color: rgba(0,0,0,0.87);
    cursor: pointer;
    min-height: 50px;
    line-height: 1.5rem;
    width: 100%;
    text-align: left;
    text-transform: none;
  }
  ul.select-options li span {
    font-size: 16px;
    color: #26a69a;
    display: block;
    line-height: 22px;
    padding: 14px 16px;
  }
  ul.select-options li.disabled>span {
    color: rgba(0,0,0,0.3);
    background-color: transparent;
  }
  input:not(.browser-default)[readonly="readonly"] {
    border-bottom: 1px solid #9e9e9e !important;
  }
</style>
