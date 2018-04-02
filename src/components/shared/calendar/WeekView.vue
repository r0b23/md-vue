<template>
  <div class="wrapper">
    <div class="week">
      <div class="calendar-header">
        <i class="material-icons navigation before" @click="addOffset(-7)">navigate_before</i>
        <h5>
          <span>{{ stw.format('YYYY MMM DD') }} - {{ stw.add(6, 'd').format('MMM DD') }}</span>
        </h5>
        <i class="material-icons navigation next" @click="addOffset(7)">navigate_next</i>
      </div>
      <div class="day-header">
        <div class="day">Hé</div>
        <div class="day">Ke</div>
        <div class="day">Sze</div>
        <div class="day">Csü</div>
        <div class="day">Pé</div>
        <div class="day">Szo</div>
        <div class="day">Va</div>
      </div>
      <div class="days">
        <div class="day" v-for="(counter) in 7" :key="counter">
          <p class="header teal lighten-2">
            <span>{{ dayOftheWeek(counter) }}</span>
          </p>
          <div class="events">
            <span class="new badge orange">
              5:40 - Sulihost
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  data () {
    return {
      counter: 1,
      week: moment().week(),
      offset: 0
    }
  },
  computed: {
    thisWeek () {
      return moment({ 'week': this.week }).add(this.offset, 'days')
    },
    // returns what day is monday
    startOfTheWeek () {
      return this.thisWeek.startOf('week').date()
    },
    stw () {
      return this.thisWeek.startOf('week')
    }
  },
  methods: {
    addOffset (offset) {
      this.offset += offset
    },
    dayOftheWeek (day) {
      const dotw = this.thisWeek.startOf('week').day(day)
      return dotw.date()
    }
  }
}
</script>
<style>
  .calendar-wrapper .days .day p.header {
    text-align: right;
    border-bottom: 1px solid #ddd;
    margin: 0;
    padding: 2px 5px 2px 0;
    color: white;
  }
</style>
