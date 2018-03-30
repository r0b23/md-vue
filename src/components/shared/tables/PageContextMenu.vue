<template>
  <div class="page-context-menu-wrapper" v-click-outside="closeMenu">
    <transition
      mode="in-out"
      :css="false"
      name="slideToggle"
      @enter="enter"
      @leave="leave">
      <div class="card page-context-menu" v-if="show">
        <div class="card-content small-card" :class="cardClasses">
          <slot name="title"></slot>
          <div class="divider"></div>
          <slot name="content"></slot>
        </div>
      </div>
    </transition>
    <i
      class="tiny material-icons user-row-add-button"
      @click="toggleMenu"
      title="Munkahely hozzáadása">
      add
    </i>
  </div>
</template>
<script>
/* eslint no-param-reassign:
  ["error", { "props": true, "ignorePropertyModificationsFor": ["el"] }] */
import Velocity from 'velocity-animate'
import ClickOutside from 'vue-click-outside'

export default {
  data () {
    return {
      show: false
    }
  },
  props: {
    cardClasses: {
      type: Array,
      required: false
    },
    title: {
      type: String,
      required: true
    }
  },
  methods: {
    closeMenu () {
      this.show = false
    },
    toggleMenu () {
      this.show = !this.show
    },
    enter (el, done) {
      Velocity(el, 'slideDown', { duration: 200, complete: done })
    },
    leave (el, done) {
      Velocity(el, 'slideUp', { duration: 200, complete: done })
    }
  },
  mounted () {
    // prevent click outside event with popupItem.
    this.popupItem = this.$el
  },
  directives: {
    ClickOutside
  }
}
</script>
<style>
  .card.page-context-menu {
    position: absolute;
    z-index: 10000;
    top: 15px;
    left: -17rem;
    min-width: 230px;
    min-height: initial;
  }
  .page-context-menu-wrapper .card.page-context-menu .card-content {
    padding: 10px;
  }
  .card.page-context-menu .card-title {
    font-size: 18px;
    font-weight: 300;
  }
  .user-row-add-button {
    font-weight: bold;
    padding: 1px;
    position: absolute;
    left: -20px;
  }
  .user-row-add-button:hover {
    cursor: pointer;
    background-color: white;
    border-radius: 50%;
  }
  .pgm-list a.pgm-list-item {
    cursor: pointer;
  }
  div.pgm-list {
    border: none;
  }
  h5.pgm-list-header {
    font-size: 14px;
  }
</style>
