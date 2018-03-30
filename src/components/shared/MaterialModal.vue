<template>
  <div class="modal-wrapper">
    <!-- <transition
      name="fadeIn"
      @enter="enterFadeIn"
      @leave="leaveFadeIn">
    </transition> -->
      <div class="material modal-overlay" @click="closeModal"></div>
    <transition
      name="scale-in"
      @enter="enterScaleIn"
      @leave="leaveScaleIn">
      <div id="modal1" class="modal" v-if="open"
        :class="{ 'modal-fixed-footer': showFooter }">
        <div class="modal-content">
          <h4>{{ header }}</h4>
          <component :is="componentId"></component>
        </div>
        <div class="modal-footer" v-if="showFooter">
          <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
/*  eslint no-param-reassign:
    ["error", { "props": true, "ignorePropertyModificationsFor": ["el"] }] */
import Velocity from 'velocity-animate'
import EmployeeInfoForm from './ModalComponents/EmployeeInfoForm'

export default {
  computed: {
    open () {
      return this.$store.getters.open
    },
    header () {
      return this.$store.getters.modalHeader
    },
    componentId () {
      return this.$store.getters.modalComponent
    },
    showFooter () {
      return this.$store.getters.showFooter
    }
  },
  methods: {
    enterScaleIn (el, done) {
      Velocity(el,
        {
          translateY: ['0px', '-100px'],
          scaleX: [1, 0.7],
          opacity: [1, 0.2],
          duration: 300,
          complete: done
        })
    },
    leaveScaleIn (el, done) {
      Velocity(el,
        {
          translateY: ['-100px', '0px'],
          scaleX: [0.7, 1],
          opacity: [0.2, 1],
          duration: 300
        }, { complete: done })
    },
    enterFadeIn (el, done) {
      Velocity(el,
        {
          opacity: [0.5, 0],
          duration: 300,
          complete: done
        })
    },
    leaveFadeIn (el, done) {
      Velocity(el,
        {
          opacity: [0, 0.5],
          duration: 300
        }, { complete: done })
    },
    closeModal () {
      this.$store.commit('closeModal')
      this.$store.commit('RESET_ERROR')
    }
  },
  components: {
    employeeInfoForm: EmployeeInfoForm
  }
}
</script>

<style>
  .modal-wrapper {
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: center;
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .modal-wrapper .modal {
    display: block;
    position: relative;
    z-index: 1003;
    will-change: initial;
    height: 86vh;
    background-color: #fff;
    max-height: initial;
}
  .material.modal-overlay {
    display: block;
    opacity: 0.5;
  }
</style>
