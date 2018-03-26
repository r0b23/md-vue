<template>
  <transition name="slideFromLeft">
    <div class="card-panel response-popup lighten-1"
      v-if="showPopup"
      :class="{ red: isErrorResponse, green: !isErrorResponse }">
      <div class="card-content">
        <span class="card-title white-text darken-1">
          <i class="material-icons">notifications</i>
          {{ title }}
        </span>
        <i class="material-icons white-text close-icon" @click="closePopup">close</i>
        <p class="white-text">
         {{ message }}
        </p>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  computed: {
    title () {
      return this.$store.getters.title
    },
    message () {
      return this.$store.getters.getMessage
    },
    showPopup () {
      return this.$store.getters.showPopup
    },
    isErrorResponse () {
      return this.$store.getters.isErrorResponse
    }
  },
  methods: {
    closePopup () {
      this.$store.commit('closePopup')
    }
  }
}
</script>
<style>
.response-popup.card-panel {
  width: 330px;
  position: fixed;
  right: 38px;
  top: 80px;
  z-index: 10000;
}
.close-icon {
  position: absolute;
  right: 8px;
  top: 8px;
  cursor: pointer;
}
.slideFromLeft-enter {
  transform: translateX(110%);
}
.slideFromLeft-enter-active {
  transition: all 250ms ease-in;
}
.slideFromLeft-leave-active {
  transition: opacity 250ms ease-in;
  opacity: 0;
}
</style>
