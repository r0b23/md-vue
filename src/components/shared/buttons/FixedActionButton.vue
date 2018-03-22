<template>
  <div class="fixed-action-btn horizontal">
    <a  class="btn-floating btn-large blue" :title="title" @click="action">
      <i class="large material-icons">{{ icon }}</i>
    </a>
  </div>
</template>
<script>
export default {
  props: {
    icon: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    action: {
      type: Function,
      required: true
    }
  }
}
</script>
