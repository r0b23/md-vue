<template>
  <div class="mat-year-picker-wrapper">
    <div class="mat-year-picker range">
      <div class="left-align range-info" @click="close()">
        <span>{{ start }}</span> - <span>{{ end }}</span>
      </div>
      <div class="right-align">
        <i
          class="small material-icons navigation before"
          @click="changeStart(-25)">
          navigate_before
        </i>
        <i
          class="small material-icons navigation next"
          @click="changeStart(25)">
          navigate_next
        </i>
      </div>
    </div>
    <div class="years">
      <div class="year" v-for="(counter) in range" :key="counter" @click="selectYear(year(counter))">
        <p class="header" >
          {{ year(counter) }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Number,
      required: true
    },
    close: {
      required: true,
      type: Function
    }
  },
  data () {
    return {
      counter: 0,
      start: this.value - 12
    }
  },
  computed: {
    end () {
      return this.start + 24
    },
    range () {
      return (this.end - this.start) + 1
    }
  },
  methods: {
    year (counter) {
      return (this.start - 1) + counter
    },
    changeStart (change) {
      this.start = this.start + change
    },
    selectYear (year) {
      this.$emit('input', year)
      this.close()
    }
  }
}
</script>
<style>
  .mat-year-picker-wrapper {
    font-size: 16px;
  }
  .mat-year-picker-wrapper .range {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: bold;
    margin-bottom: 1em;
  }
  .mat-year-picker-wrapper .range div.range-info {
    padding: 0.5em;
  }
  .mat-year-picker-wrapper .range div.range-info:hover {
    cursor: pointer;
    padding: 0.5em;
    background-color: rgba(0,0,0,.04);
  }
  .mat-year-picker-wrapper .range i.material-icons:hover {
    cursor: pointer;
  }
  .mat-year-picker-wrapper .years {
    display: flex;
    flex-wrap: wrap;
  }
  .mat-year-picker-wrapper .year {
    background-color: transparent;
    width: calc(100% / 5);
    line-height: 2.5;
  }
  .mat-year-picker-wrapper .year p.header {
    margin: 10px;
    text-align: center;
  }
  .mat-year-picker-wrapper .year:hover {
    cursor: pointer;
    background-color: rgba(0,0,0,.04);
  }
  .mat-year-picker-wrapper .years .years p.header {
    text-align: center;
    margin: 0;
    padding-top: 2px;
    padding-bottom: 2px;
  }
</style>
