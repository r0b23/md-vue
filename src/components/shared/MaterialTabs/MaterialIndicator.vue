<template>
  <li class="indicator white" :style="position"></li>
</template>
<script>
export default {
  props: {
    position: {
      type: Object,
      required: true
    }
  }
}
</script>
<style>
  .tabs li.indicator {
    height: 5px;
    transition: left .5s, right .5s;
  }
</style>
