<template>
  <div class="accordion-wrapper">
    <div class="ui vertical accordion menu">
      <div class="item" :class="{ active: show }" >
        <router-link :to="link"
          activeClass="active-link"
          class="title"
          :class="{ active: show }" exact>
          <i class="dropdown icon" tabindex="0" @click="toggleContent">
            <div class="menu" tabindex="-1"></div>
          </i>
          <i class="icon" :class="icon"></i>
          {{ title }}
        </router-link>
          <div class="content" :class="{ active: show }">
            <transition
              mode="in-out"
              :css="false"
              name="slideToggle"
              @enter="enter"
              @leave="leave">
              <div class="items" v-if="show">
                <slot></slot>
              </div>
            </transition>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Velocity from 'velocity-animate'

export default {
  props: ['title', 'icon', 'link'],
  data () {
    return {
      show: false
    }
  },
  /*  eslint no-param-reassign:
    ["error", { "props": true, "ignorePropertyModificationsFor": ["el"] }] */
  methods: {
    toggleContent () {
      this.show = !this.show
    },
    enter (el, done) {
      Velocity(el, 'slideDown', { duration: 300, complete: done })
    },
    leave (el, done) {
      Velocity(el, 'slideUp', { duration: 300, complete: done })
    }
  }
}
</script>
<style>
  .ui.accordion.menu .item .title {
    font-size: 18px;
  }
  .ui.accordion:not(.styled) .title~.content:not(.ui) {
    display:block !important;
    padding: 0 ;
  }
  .ui.vertical.menu .menu.accordion .item {
    padding: 0;
  }
  .ui.accordion.menu div.item a.title {
    padding: 11px 15px;
  }
  .ui.accordion.menu .item .title>.dropdown.icon:focus {
    outline: none;
  }
  .ui.accordion.menu .content .items {
    overflow: hidden;
    padding: 0px;
    border-bottom: 1px solid;
  }
  .sub-item {
    display: block;
    font-size: 16px;
    line-height: 20px;
    padding: 10px 15px;
    color: white;
  }
  .sub-item:hover {
    cursor: pointer;
    background: #263646;
  }
  .ui.vertical.accordion.menu .active-link {
    background: #263646;
    color: white;
  }
</style>
