<template>
  <div>
    <!-- <transition name="slideFromLeft">
      <div class="card-panel green response-popup" v-if="show">
        <div class="card-cotntent">
          <span class="card-title white-text darken-1">
            <i class="material-icons">notifications</i>
            Új munkavállaló hozzáadva
          </span>
          <i class="material-icons white-text close-icon">close</i>
          <p class="white-text">
            Új munkavállaló: <router-link class="white-text" :to="'/munkavallalok/5ab2b313df9c2316489fd855'"><b>Rác István</b></router-link>
          </p>
        </div>
      </div>
    </transition>
    <button class="waves-effect waves-light btn" @click="show = !show">Show me</button> -->
    <div style="position:relative">
      <button class="waves-effect waves-light btn center-align" :class="{ loading: isActive }" @click="toggle">
        <span v-if="true">Munkavállaló mentése</span>
      </button>
    </div>
  </div>
</template>
<script>
import MaterialTabs from './shared/MaterialTabs/MaterialTabs'
import DataTable from './shared/tables/UserTable'

export default {
  data () {
    return {
      isActive: false,
      spinnerColor: {
        borderColor: 'white'
      }
    }
  },
  methods: {
    toggle () {
      this.isActive = !this.isActive
    }
  },
  created () {
    this.$store.dispatch('fetchUsers', '')
  },
  components: {
    materialTabs: MaterialTabs,
    dataTable: DataTable
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
