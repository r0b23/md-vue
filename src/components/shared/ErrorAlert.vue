<template>
  <transition name="fade" mode="out-in">
    <p v-if="hasError" class="login-error z-depth-1">
      <i class="material-icons prefix">error</i>
      {{ errorMessage }}
    </p>
  </transition>
</template>
<script>
export default {
  props: {
    hasError: {
      type: Boolean,
      required: true
    },
    errorMessage: {
      type: String
    }
  }
}
</script>
<style>
  p.error-alert {
    background-color: #F44336;
    color:white;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5em;
  }
  p.error-error i.material-icons {
    margin-right: .5em;
  }
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes fade-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
</style>
