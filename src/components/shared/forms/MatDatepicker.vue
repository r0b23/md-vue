<template>
  <div class="mat-datepicker-wrapper input-field col" :class="inputWrapper">
    <label :for="id" class="datepicker-label" :class="{ active: value }">{{ label }}</label>
    <transition name="datepicker">
      <div class="mat-picker-wrapper" v-if="showPicker" @click.self="hidePicker($event)" >
        <div class="mat-picker z-depth-4" >
          <div class="calendar-header" v-if="!showYearPicker">
            <div class="flex__auto left-align">
              <span @click="toggleSelectYear"> {{ year }}</span>
              <span @click="toggleSelectMonth">{{ monthToString }}</span>
            </div>
            <i
              class="small material-icons navigation before waves-effect waves-light"
              @click="lastMonth()">
              navigate_before
            </i>
            <i
              class="small material-icons navigation next"
              @click="nextMonth()">
              navigate_next
            </i>
          </div>
          <div class="month-picker" v-if="showMonthPicker">
            <div @click="selectMonth(0)">Jan</div>
            <div @click="selectMonth(1)">Feb</div>
            <div @click="selectMonth(2)">Már</div>
            <div @click="selectMonth(3)">Ápr</div>
            <div @click="selectMonth(4)">Máj</div>
            <div @click="selectMonth(5)">Jún</div>
            <div @click="selectMonth(6)">Júl</div>
            <div @click="selectMonth(7)">Aug</div>
            <div @click="selectMonth(8)">Szep</div>
            <div @click="selectMonth(9)">Okt</div>
            <div @click="selectMonth(10)">Nov</div>
            <div @click="selectMonth(11)">Dec</div>
          </div>
          <year-picker
            v-model="year"
            v-if="showYearPicker"
            :close="hideYearSelect"
          />
          <template  v-if="!showMonthPicker && !showYearPicker">
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
              <template v-if="lastMonthLastDays !== 0">
                <div class="last-month day"
                  v-for="(lmCounter, index) in lastMonthLastDays"
                  :key="`lm${index}`"></div>
              </template>
              <div class="day"
                v-for="(counter) in daysOfTheMonth"
                :key="`tm${counter}`"
                @click="selectDate(counter)">
                <p class="header" :class="{ highlighted: highlight(counter) }">
                  <span>{{ counter }}</span>
                </p>
              </div>
              <template v-if="nextMonthFirstDays > 0">
                <div class="next-month day"
                  v-for="(counter, index) in nextMonthFirstDays"
                  :key="`nm${index}`"></div>
              </template>
            </div>
          </template>
        </div>
      </div>
    </transition>
    <input
      type="text"
      class="mat-datepicker datepicker"
      :id="id"
      readonly
      :value="dateValueToString"
      @click="onDatePick">
  </div>
</template>
<script>
import moment from 'moment'
import YearPicker from './YearPicker'

moment.locale('hu')
export default {
  data () {
    return {
      showPicker: false,
      showMonthPicker: false,
      showYearPicker: false,
      counter: 1,
      lmCounter: 0,
      year: null,
      month: null,
      monthOptions: [
        { value: 0, displayValue: 'Január' }
      ]
    }
  },
  computed: {
    dateValue () {
      if (this.value) {
        return moment(this.value)
      } else {
        return moment()
      }
    },
    dateValueToString () {
      if (this.value) {
        return moment(this.value).format('LL')
      }
      return ''
    },
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
      this.showMonthPicker = false
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
      this.showMonthPicker = false
    },
    onDatePick () {
      this.year = moment(this.dateValue).year()
      this.month = moment(this.dateValue).month()
      this.showPicker = true
    },
    hidePicker (event) {
      this.showPicker = false
      this.year = this.dateValue.get('year')
      this.month = this.dateValue.get('month')
      this.showMonthPicker = false
      this.showYearPicker = false
    },
    highlight (day) {
      const helperDate = moment()
      const selectedDate = this.dateValue
      helperDate.set({ 'year': this.dateValue.get('year') })
      helperDate.set({ 'month': this.dateValue.get('month') })
      helperDate.date(day)
      if (
        helperDate.date() === selectedDate.date() &&
        helperDate.month() === this.month &&
        helperDate.year() === this.year
      ) {
        return true
      }
      return false
    },
    selectDate (day) {
      const selectedDate = moment().year(this.year).month(this.month).date(day)
      this.$emit('input', selectedDate.format('YYYY-MM-DD'))
      this.$_date = selectedDate
      this.showPicker = false
    },
    toggleSelectMonth () {
      this.showMonthPicker = !this.showMonthPicker
      this.showYearPicker = false
    },
    toggleSelectYear () {
      this.showYearPicker = !this.showYearPicker
      this.showMonthPicker = false
    },
    hideYearSelect () {
      this.showYearPicker = false
    },
    selectMonth (month) {
      this.month = month
      this.showMonthPicker = false
    },
    selectYear (year) {
      this.year = year
    }
  },
  created () {
    if (this.value) {
      this.$_date = moment(this.value)
    } else {
      this.$_date = moment()
    }
  },
  props: {
    inputWrapper: {
      type: Object,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    value: {
      type: String
    }
  },
  components: {
    yearPicker: YearPicker
  }
}
</script>
<style>
  .mat-datepicker-wrapper {
    position: relative;
    transition: opacity .3s ease;
    z-index: 100;
  }
  input[type=text].mat-datepicker.datepicker {
    cursor: default;
    border-bottom: 1px solid #9e9e9e;
  }
  .mat-datepicker-wrapper .mat-picker-wrapper {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
    background-color: rgba(0,0,0,0.3);
    transition: opacity .3s ease;
  }
  .mat-picker-wrapper .mat-picker {
    font-size: 16px;
    padding: 0.5em;
    width: 330px;
    height: 370px;
    background-color: white;
    transition: all .3s ease;
    z-index: 1000;
    position: relative;
  }
  .mat-datepicker-wrapper .calendar-header {
    display: flex;
    flex-wrap: nowrap;
    position: relative;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5em;
    font-size: 16px;
  }
  .mat-datepicker-wrapper .calendar-header span {
    font-weight: bold;
    padding: .5em;
  }
  .mat-datepicker-wrapper .calendar-header span:hover {
    cursor:pointer;
    background-color: rgba(0,0,0,.04);
  }
  .mat-datepicker-wrapper .calendar-header .navigation {
    cursor: pointer;
  }
  .mat-datepicker-wrapper .month-picker {
    display: flex;
    flex-wrap: wrap;
    margin-top: 4em;
  }
  .mat-datepicker-wrapper .month-picker div {
    width: 25%;
    padding: 1em;
    cursor: pointer;
    text-align: center;
  }
  .mat-datepicker-wrapper .month-picker div:hover {
    background-color: rgba(0,0,0,.04);
  }
  .mat-datepicker-wrapper .day-header {
    border-bottom: 1px solid #d0d0d0;
    margin-bottom: 5px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background-color: #f9f9f9;
  }
  .mat-datepicker-wrapper .day-header .day {
    width: calc(100% / 7);
    text-align: center;
    padding-top: 2px;
    padding-bottom: 2px;
    line-height: 2.5;
    font-size: 14px;
  }
  .mat-datepicker-wrapper .days {
    display: flex;
    flex-wrap: wrap;
  }
  .mat-datepicker-wrapper .day {
    background-color: transparent;
    width: calc(100% / 7);
    line-height: 2.5;
  }
  .mat-datepicker-wrapper .days .day p.header {
    text-align: center;
    margin: 0;
    padding-top: 2px;
    padding-bottom: 2px;
  }
  p.header.highlighted {
    background-color: #26a69a;
    color: white;
    border-radius: 50%;
    padding: 0;
}
  .mat-datepicker-wrapper .days .day:hover {
    font-weight: bold;
    cursor: pointer;
  }
  .mat-datepicker-wrapper .last-month.day, .next-month.day {
    opacity: .3;
  }
.datepicker-enter {
  opacity: 0;
}
.datepicker-leave-active {
  opacity: 0;
}

.datepicker-enter .mat-picker,
.datepicker-leave-active .mat-picker {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.input-field.col .datepicker-label {
  transform: translateY(-14px) scale(0.8);
  transform-origin: 0 0;
}
</style>
