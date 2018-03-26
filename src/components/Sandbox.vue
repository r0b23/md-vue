<template>
  <div>
    <response-popup></response-popup>
    <button class="waves-effect waves-light btn" @click="openPopup(true)">Show me</button>
  </div>
</template>
<script>
import Calendar from './shared/calendar/MonthView'
import ResponsePopup from './shared/ResponsePopup'
export default {
  data () {
    return {
      show: false
    }
  },
  computed: {
    title () {
      return 'HEllo'
    }
  },
  methods: {
    toggle () {
      this.show = !this.show
    },
    closePopup () {
      this.$store.commit('closePopup')
    },
    openPopup (isError) {
      const payload = {
        showPopup: true,
        title: 'Új munkválló hozzáadva.',
        isError,
        message: 'HOHOHOHOHOHOHHOHOHOH HOHOHOHOHOHOHOH HOHOHOHOHOHOHH adfasdfa asd'
      }
      this.$store.commit('openPopup', payload)
    }
  },
  created () {
    this.$store.dispatch('fetchUsers', '')
  },
  components: {
    calendar: Calendar,
    responsePopup: ResponsePopup
  }
}
</script>
<style>
  .button-loader-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background-color: rgba(0,0,0,0.4);
    height: 100%;
  }
  .response-popup.card-panel {
    width: 330px;
    position: fixed;
    right: 38px;
    top: 80px;
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
