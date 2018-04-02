<template>
  <div class="calendar-wrapper card-panel">
    <h3 class="calendar-title">{{ title }}</h3>
    <div class="view-controll" v-if="!disableControll">
      <span
        class="new badge blue"
        :class="{ active: componentId === 'monthView' }"
        @click="changeView('monthView')">month</span>
      <span
        class="new badge blue"
        :class="{ active: componentId === 'weekView' }"
        @click="changeView('weekView')">week</span>
      <!-- <span class="new badge blue" :class="{ active: componentId === 'dayView' }">day</span> -->
    </div>
    <div class="views">
      <component :is="componentId"></component>
      <!-- <week-view/> -->
    </div>
  </div>
</template>
<script>
import MonthView from './MonthView'
import WeekView from './WeekView'

export default {
  props: {
    title: {
      required: true,
      type: String
    },
    startView: {
      type: String,
      default: 'weekView'
    },
    disableControll: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      componentId: this.startView
    }
  },
  methods: {
    changeView (componentId) {
      this.componentId = componentId
    }
  },
  components: {
    monthView: MonthView,
    weekView: WeekView
  }
}
</script>
<style>
  .wrapper div:not(.day) {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    _justify-content: center;
  }
  .calendar-title {
    margin: 0 0 0.5em;
    text-align: center;
  }
  .calendar-wrapper.card-panel {
    position: relative;
    padding-top: 1em;
    padding-bottom: 2em;
  }
  .calendar-header h5 {
    margin: 0.593333rem 0 .656rem 0;
  }
  .view-controll {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    justify-content: flex-end;
    position: absolute;
    right: 15px;
    top: 95px;
    z-index: 1000;
  }
  .view-controll span.new.badge {
    width: initial;
    margin: 0 .5em;
    padding: 5px;
    font-size: 1em;
    height: initial;
    box-sizing: border-box;
    border: 1px solid #2196F3;
  }
  .view-controll span.new.badge:hover, .view-controll span.new.badge.active {
    cursor: pointer;
    color: #2196F3;
    background-color: white !important;
  }
  .view-controll span.new.badge:after {
    display:none;
  }
  .calendar-header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .navigation {
    cursor: pointer;
    font-size: 2.5em;
  }
  .navigation.before {
    left: 0;
  }
  .navigation.next {
    right: 0;
  }
  .calendar-wrapper .day-header {
    border-bottom: 1px solid #d0d0d0;
    margin-bottom: 20px;
    margin-top: 15px;
  }
  .calendar-wrapper .day-header .day {
    width: calc(100% / 7);
    text-align: center;
    padding-top: 2px;
    padding-bottom: 2px;
    line-height: 1.5;
  }
  .calendar-wrapper .days .day {
    background-color: transparent;
    width: calc(100% / 7);
    height: 100px;
    line-height: 1.5;
    border: 1px solid #ddd;
  }
  .calendar-wrapper .days .day p.header {
    text-align: right;
    border-bottom: 1px solid #ddd;
    margin: 0;
    padding: 2px 5px 2px 0;
    color: white;
  }
  span.badge.new {
    width: 100%;
    padding: 0;
    margin-left: 0;
  }
  span.badge.new:after {
    display:none;
  }
  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
