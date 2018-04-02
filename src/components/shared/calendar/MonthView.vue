<template>
  <div class="wrapper">
    <div class="month">
      <div class="calendar-header">
        <i class="material-icons navigation before" @click="lastMonth()">navigate_before</i>
        <h5>{{ year }} {{ monthToString }}</h5>
        <i class="material-icons navigation next" @click="nextMonth()">navigate_next</i>
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
      <div class="days" >
        <template v-if="lastMonthLastDays !== 0">
          <div class="last-month day"
            v-for="(lmCounter, index) in lastMonthLastDays"
            :key="`lm${index}`">
          </div>
        </template>
        <div class="day" v-for="(Counter) in daysOfTheMonth" :key="`tm${Counter}`">
          <p class="header teal lighten-2">
            <span>{{Counter}}</span>
          </p>
          <div class="events">
            <span class="new badge orange">
              5:40 - Sulihost
            </span>
          </div>
        </div>
        <template v-if="nextMonthFirstDays">
          <div class="next-month day"
            v-for="(Counter, index) in nextMonthFirstDays"
            :key="`nm${index}`">
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'

export default {
  data () {
    return {
      today: moment(),
      Counter: 1,
      lmCounter: 0,
      year: moment().get('year'),
      month: moment().get('month')
    }
  },
  computed: {
    thisMonth () {
      return moment({ 'year': this.year, 'month': this.month })
    },
    daysOfTheMonth () {
      return this.numberOfDaysOfMonth(this.thisMonth.get('month'))
    },
    daysOfThelastMonth () {
      if (this.thisMonth.get('month') === 0) {
        return this.numberOfDaysOfMonth(11)
      } else {
        return this.numberOfDaysOfMonth(this.thisMonth.get('month') - 1)
      }
    },
    startofLastWeekOfLastMonth () {
      return this.daysOfThelastMonth - this.lastMonthLastDays
    },
    firstDayOfTheMonth () {
      // Sunday is 0, so we need to change it to 7
      return this.thisMonth.get('day') === 0 ? 7 : this.thisMonth.get('day')
    },
    lastMonthLastDays () {
      return this.firstDayOfTheMonth - 1
    },
    nextMonthFirstDays () {
      return 42 - (this.daysOfTheMonth + this.lastMonthLastDays)
    },
    monthToString () {
      switch (this.month) {
        case 0 :
          return 'Január'
        case 1:
          return 'Február'
        case 2:
          return 'Március'
        case 3:
          return 'Április'
        case 4:
          return 'Május'
        case 5:
          return 'Június'
        case 6:
          return 'Július'
        case 7:
          return 'Augusztus'
        case 8:
          return 'Szeptember'
        case 9:
          return 'Október'
        case 10:
          return 'November'
        case 11:
          return 'December'
        default:
          return 'Nincs ilyen hónap'
      }
    }
  },
  methods: {
    numberOfDaysOfMonth (month) {
      switch (month) {
        case 1:
          // szökőév
          if ((this.year % 4 === 0 && this.year % 100 !== 0) || this.year % 400 === 0) {
            return 29
          } else {
            return 28
          }
        case 0:
        case 2:
        case 4:
        case 6:
        case 7:
        case 9:
        case 11:
          return 31
        case 3:
        case 5:
        case 8:
        case 10:
          return 30
      }
    },
    nextMonth () {
      if (this.month === 11) {
        this.month = 0
        this.year = this.year + 1
      } else {
        this.month = this.month + 1
      }
    },
    lastMonth () {
      if (this.month === 0) {
        this.month = 11
        this.year--
      } else {
        this.month--
      }
    }
  }
}
</script>

<style>
  .month.card-panel.col  {
    margin: auto;
    padding-bottom: 2em;
  }
  .month .days .last-month.day, .month .days .next-month.day {
    opacity: .3;
    border: none;
  }
</style>
