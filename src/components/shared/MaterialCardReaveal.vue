<template>
  <div class="col s4">
    <div class="card" :style="overflow">
      <div class="card-image waves-effect waves-block waves-light">
      </div>
      <div class="card-content">
        <a class="btn-floating waves-effect waves-light blue lighten-1 right relative-btn">
          <i class="material-icons right" @click="revealInfo()">info</i>
        </a>
        <span class="card-title activator grey-text text-darken-4">Suli host
        </span>
        <p><a href="#">This is a link</a></p>
      </div>
      <transition name="reveal" @enter="enterReveal" @leave="leaveReveal">
        <div class="card-reveal" v-if="showInfo">
          <span class="card-title grey-text text-darken-4">Suli host
          <i class="material-icons right" @click="hideInfo">close</i></span>
          <p>
            Here is some more information about this company. As a creative studio we believe no client is too big nor too small to work with us to obtain good advantage.By combining the creativity of artists with the precision of engineers we develop custom solutions that achieve results.Some more information about this company.
          </p>
          <p>
            <i class="small material-icons left blue-text text-lighten-1">person_outline</i>
            Pályi Zsolt
          </p>
          <p>
            <i class="small material-icons left blue-text text-lighten-1">business</i>
            6710, Szeged Kökörcsin utca 9.
          </p>
          <p>
            <i class="small material-icons left blue-text text-lighten-1">perm_phone_msg</i>
            +36308121602
          </p>
          <p>
            <i class="small material-icons left blue-text text-lighten-1">mail</i>
            rbert.kasza@gmail.com
          </p>
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
</style>
