<template>
  <li class="tab col" :class="tabHeaderClass">
    <a class="white-text" :class="{ active }">{{ tabTitle }}</a>
  </li>
</template>
<script>
export default {
  props: {
    tabHeaderClass: {
      type: Object
    },
    tabTitle: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      required: true
    }
  }
}
</script>
<style>
  .tab a {
    font-weight: bold;
  }
  .tab a:hover {
    cursor: pointer;
  }
</style>
