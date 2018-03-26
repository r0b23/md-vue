<template>
  <div class="wrapper">
    <div class="month">
      <div class="calendar-header">
        <i class="large material-icons navigation before" @click="lastMonth()">navigate_before</i>
        <h1>{{ year }} {{ monthToString }}</h1>
        <i class="large material-icons navigation next" @click="nextMonth()">navigate_next</i>
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
      <transition
        mode="in-out"
        :css="false"
        name="fadeIn"
        @enter="enter"
        @leave="leave">
        <div class="days" v-if="changeMonth">
          <template v-if="lastMonthLastDays !== 0">
            <div class="last-month day"
              v-for="(lmCounter, index) in lastMonthLastDays"
              :key="`lm${index}`">
                <p class="header">
                  {{ (startofLastWeekOfLastMonth + lmCounter) }}
                </p>
                <div class="events">
                </div>
            </div>
          </template>
          <div class="day" v-for="(Counter) in daysOfTheMonth" :key="`tm${Counter}`">
            <p class="header">
              <span>{{Counter}}</span>
            </p>
            <div class="events">
              <p style="color:green" :class="{ red: Counter % 7 == 0 }"></p>
              <template v-if="test[Counter]">
                <div class="event ellipsis">
                  <span class="new badge">{{ test[Counter].duration }}ó:  {{ test[Counter].title }}</span>
                </div>
              </template>
            </div>
          </div>
          <template v-if="nextMonthFirstDays">
            <div class="next-month day"
              v-for="(Counter, index) in nextMonthFirstDays"
              :key="`nm${index}`">
                <p class="header">
                  <span>{{Counter}}</span>
                </p>
                <div class="events">
                  <span></span>
                </div>
            </div>
          </template>
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
      today: new Date(),
      Counter: 1,
      lmCounter: 0,
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      changeMonth: true,
      token: '',
      test: {
        21: {
          title: 'Munka',
          duration: 8
        }
      }
    }
  },
  computed: {
    thisMonth () {
      return new Date(this.year, this.month)
    },
    daysOfTheMonth () {
      return this.numberOfDaysOfMonth(this.thisMonth.getMonth())
    },
    daysOfThelastMonth () {
      if (this.thisMonth.getMonth() === 0) {
        return this.numberOfDaysOfMonth(11)
      } else {
        return this.numberOfDaysOfMonth(this.thisMonth.getMonth() - 1)
      }
    },
    startofLastWeekOfLastMonth () {
      return this.daysOfThelastMonth - this.lastMonthLastDays
    },
    firstDayOfTheMonth () {
      // Sunday is 0, so we need to change it to 7
      return this.thisMonth.getDay() === 0 ? 7 : this.thisMonth.getDay()
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
    getAll () {
      console.log(this.token)
      const myInit = {
        method: 'GET',
        headers: new Headers({
          credentials: 'include',
          'Authorization': `Bearer ${this.token}`
        }),
        mode: 'cors'
      }
      fetch('http://localhost:8080/user/authenticate', myInit).then(response => response.json())
        .then(data => {
          console.log(data)
        })
    },
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
      this.changeMonth = false
      console.log('hi')
      if (this.month === 11) {
        this.month = 0
        this.year = this.year + 1
      } else {
        this.month = this.month + 1
      }
      this.changeMonth = true
    },
    lastMonth () {
      this.changeMonth = false
      if (this.month === 0) {
        this.month = 11
        this.year--
      } else {
        this.month--
      }
      this.changeMonth = true
    },
    enter (el, done) {
      Velocity(el, 'fadeIn', { duration: 300, complete: done })
    },
    leave (el, done) {
      Velocity(el, 'fadeOut', { duration: 300, complete: done })
    }
  }
}
</script>

<style>
  .calendar-header {
    position: relative;
    align-items: center
  }
  .navigation {
    position: absolute;
    cursor: pointer;
  }
  .navigation.before {
    left: 0;
  }
  .navigation.next {
    right: 0;
  }
  .month  {
    width: 770px;
    margin: auto;
  }
  .month div:not(.day) {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background-color: #f9f9f9;
  }
  .wrapper .day-header {
    border-bottom: 1px solid #d0d0d0;
    margin-bottom: 5px;
  }
  .wrapper .day-header .day {
    width: calc(100% / 7);
    text-align: center;
    padding-top: 2px;
    padding-bottom: 2px;
    line-height: 1.5;
  }
  .month .days .day {
    background-color: transparent;
    width: calc(100% / 7);
    height: 100px;
    line-height: 1.5;
  }
  .month .days .day p.header {
    text-align: right;
    border-bottom: 1px solid #ddd;
    margin: 0;
    padding-top: 2px;
    padding-bottom: 2px;
  }
  .last-month.day, .next-month.day {
    opacity: .3;
  }
  .ellipsis {
    /* height: 1.5em; */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  span.badge.new {
    width: 100%;
    padding: 0;
    margin-left: 0;
  }
  span.badge.new:after {
    display:none;
  }

</style>
