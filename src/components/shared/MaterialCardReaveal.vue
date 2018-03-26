<template>
  <div class="col" :class="cardClass">
    <div class="card" :style="overflow">
      <div class="card-image waves-effect waves-block waves-light user-profile-background">
        <!-- src-t berakni propertiesbe -->
        <img class="activator" src="../../assets/user-profile-bg.png">
      </div>
      <div class="usertype">
        <slot name="usertype"></slot>
      </div>
      <div class="card-content">
        <a class="btn-floating waves-effect waves-light blue lighten-1 right">
          <i class="material-icons right" @click="revealInfo()">{{ icon }}</i>
        </a>
        <slot name="info"></slot>
      </div>
      <transition name="reveal" @enter="enterReveal" @leave="leaveReveal">
        <div class="card-reveal" v-if="showInfo">
          <i class="material-icons right close" @click="hideInfo">close</i>
          <slot name="reveal"></slot>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import Velocity from 'velocity-animate'

export default {
  data () {
    return {
      showInfo: false,
      overflow: {
        overflow: 'hidden'
      }
    }
  },
  props: {
    icon: {
      required: true,
      type: String
    },
    cardClass: {
      required: true,
      type: Object
    }
  },
  computed: {
  },
  methods: {
    revealInfo () {
      this.showInfo = true
      this.overflow.overflow = 'visble'
    },
    hideInfo () {
      this.showInfo = false
    },
    enterReveal (el, done) {
      Velocity(el,
        {
          translateY: ['-100%', '0%'],
          duration: 300,
          complete: done
        })
    },
    leaveReveal (el, done) {
      this.overflow.overflow = 'hidden'
      Velocity(el,
        {
          translateY: ['0%', '-100%'],
          duration: 300
        }, { complete: done })
    }
  }
}
</script>
<style>
  .card {
    _overflow: hidden;
    font-size: 15px;
    min-height: 400px;
  }
  .card .card-reveal {
    display: block;
  }
  .color-blue {
    color: #42A5F5;
  }
  .relative-btn {
    top: -48px;
    right: -10px;
  }
  .user-profile-background {
    height: 250px;
  }
  .material-icons.close {
    cursor: pointer;
  }
  div.usertype {
    position: relative;
    height: 0;
  }
  span.circle.usertype{
    color: white;
    background: linear-gradient(45deg, #0288d1 0%, #26c6da 100%);
    border-radius: 50%;
    width: 85px;
    height: 85px;
    display: inline-flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    font-size: 2em;
    font-weight: bold;
    position: absolute;
    left: 2em;
    top: -45px;
    z-index: 1;
}
</style>
