<template>
    <div class="input-field col s12">
      <div v-if="inline">
        <p class="inline-radio-wrapper">
          <span
            v-for="(button, index) in buttons"
            :key="index">
            <input
              class="with-gap"
              :name="name"
              :checked="value == button.value"
              type="radio"
              :id="`${id}${index}`"/>
            <label
              class="material-radio-button-label"
              @click="inputValue(button.value)"
              :for="`${id}${index}`">
              {{ button.displayValue }}
            </label>
          </span>
        </p>
      </div>
      <div v-else>
        <p
          v-for="(button, index) in buttons"
          :key="index">
          <input
            class="with-gap"
            :name="name"
            :checked="value == button.value"
            type="radio"
            :id="`${id}${index}`"/>
          <label
            class="material-radio-button-label"
            @click="inputValue(button.value)"
            :for="`${id}${index}`">
            {{ button.displayValue }}
          </label>
        </p>
      </div>
    </div>
</template>
<script>
export default {
  props: {
    value: {
      required: true
    },
    buttons: {
      type: Array,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    inline: {
      type: Boolean
    }
  },
  methods: {
    inputValue (value) {
      this.$emit('input', value)
    }
  }
}
</script>
<style>
  .input-field label.material-radio-button-label {
    pointer-events: initial;
  }
  div.input-field p.inline-radio-wrapper {
    margin-bottom: 2em;
  }
</style>
