<template>
  <div class="modal-wrapper">
    <div class="material modal-overlay" @click="closeModal"></div>
    <transition
      name="scale-in"
      @enter="enterScaleIn"
      @leave="leaveScaleIn">
      <div id="modal1" class="modal" v-if="open"
        :class="modalClasses">
        <div class="modal-content">
          <h4>{{ header }}</h4>
          <component :is="componentId"></component>
        </div>
        <div class="modal-footer" v-if="showFooter">
          <a
            class="modal-action modal-close waves-effect waves-green btn-flat" @click="executeAction">Igen</a>
          <a
            class="modal-action modal-close waves-effect waves-red btn-flat" @click="closeModal">Mégse</a>
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
import ConfirmMessage from './ModalComponents/Confirm'

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
    },
    size () {
      return this.$store.getters.size
    },
    modalClasses () {
      const size = this.size ? this.size : 'medium'
      return {
        'modal-fixed-footer': this.showFooter,
        [size]: true
      }
    },
    action () {
      return this.$store.getters.action
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
    },
    executeAction () {
      this.action()
    }
  },
  components: {
    employeeInfoForm: EmployeeInfoForm,
    confirmMessage: ConfirmMessage
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
  .modal-wrapper .small.modal {
    height: 31vh;
    width: 25%;
  }
  .material.modal-overlay {
    display: block;
    opacity: 0.5;
  }
</style>
