<template>
  <ul class="pagination">
    <li
      class="waves-effect arrow"
      :class="{ disabled: currentPage === 1 }"
      @click="changeCurrentPage('prev')">
        <a><i class="material-icons">chevron_left</i></a>
    </li>
    <li
      v-if="currentPage > 5"
      @click="changeCurrentPage(1)"
      class="waves-effect">
      <a>1</a>
    </li>
    <li
      v-if="currentPage > 5"
      class="waves-effect disabled">
      <a>...</a>
    </li>

    <li
      class="waves-effect"
      :class="{ active: counter === currentPage - offset }"
      @click="changeCurrentPage(counter + offset)"
      v-for="counter in pages()" :key="counter">
      <a>{{ counter + offset }}</a>
    </li>
    <li
      v-if="numberOfPages > 7  && currentPage <= numberOfPages - 6"
      class="waves-effect disabled">
      <a>...</a>
    </li>
    <li
      v-if="numberOfPages > 7 && currentPage <= numberOfPages - 6"
      @click="changeCurrentPage(numberOfPages)"
      class="waves-effect">
      <a>{{ numberOfPages }}</a>
    </li>
    <li
      class="waves-effect arrow"
      :class="{ disabled: currentPage === numberOfPages }"
      @click="changeCurrentPage('next')">
        <a><i class="material-icons">chevron_right</i></a>
    </li>
  </ul>
</template>
<script>
export default {
  data () {
    return {
      counter: 10,
      offset: 1
    }
  },
  computed: {
    start () {
      return this.currentPage - 4
    },
    end () {
      return this.currentPage + 3
    }
  },
  methods: {
    pages () {
      const pages = this.numberOfPages
      if (pages <= 7) {
        this.offset = 0
        return pages
      } else if (pages > 7 && this.currentPage < 6) {
        this.offset = 0
        return 7
      } else if (pages > 7 && this.currentPage > 5) {
        if (this.numberOfPages - 6 >= this.currentPage) {
          if (this.start !== (this.counter + this.offset)) {
            this.offset = this.start
          }
          return this.end - this.start
        } else {
          this.offset = this.numberOfPages - 7
          return this.numberOfPages - this.offset
        }
      }
    },
    changeCurrentPage (value) {
      this.$emit('changeCurrentPage', value)
    }
  },
  props: {
    currentPage: {
      required: true,
      type: Number
    },
    numberOfPages: {
      required: true,
      type: Number
    }
  }
}
</script>
<style>
  .pagination li:not(.arrow):not(.disabled):hover {
    background-color: #ee6e73;
    cursor: pointer;
  }
  .pagination li:not(.arrow):not(.disabled):hover a {
    color: #fff;
  }
  .pagination li.placeholder{
    font-weight: bold;
    font-size: 1.6em;
  }
</style>
