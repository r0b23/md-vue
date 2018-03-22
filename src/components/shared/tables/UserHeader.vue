<template>
  <th @click="onSetOrder" class="order-controller">
    <slot></slot>
    <div class="order-icon-wrapper">
      <i class="small material-icons controll" v-if="order">{{ icon }}</i>
    </div>
  </th>
</template>
<script>
export default {
  data () {
    return {
      show: false,
      icon: 'arrow_drop_down',
      order: null
    }
  },
  methods: {
    onSetOrder () {
      if (this.order === null) {
        this.order = 'desc'
        this.icon = 'arrow_drop_down'
      } else if (this.order === 'desc') {
        this.order = 'asc'
        this.icon = 'arrow_drop_up'
      } else {
        this.order = null
      }
      this.$emit('orderChanged', this.order)
    }
  }
}
</script>
<style>
  th.order-controller:hover {
    cursor: pointer;
  }
  .order-icon-wrapper {
    position: absolute;
    left: 83%;
    width: 20px;
    top: 0px;
  }
  .controll {
    cursor: pointer;
  }
</style>
