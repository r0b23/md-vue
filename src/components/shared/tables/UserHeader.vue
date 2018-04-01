<template>
  <th @click="onSetOrder" class="order-controller">
    <slot></slot>
    <div class="order-icon-wrapper">
      <i class="small material-icons controll" v-if="isActive">{{ icon }}</i>
    </div>
  </th>
</template>
<script>
export default {
  data () {
    return {
      show: false,
      icon: 'arrow_drop_down',
      order: 'asc'
    }
  },
  props: {
    sortProp: {
      type: String,
      required: true
    },
    activeProp: {
      type: String,
      required: true
    }
  },
  computed: {
    isActive () {
      return this.sortProp === this.activeProp
    }
  },
  methods: {
    onSetOrder () {
      if (this.order === 'asc') {
        this.order = 'desc'
        this.icon = 'arrow_drop_down'
      } else if (this.order === 'desc') {
        this.order = 'asc'
        this.icon = 'arrow_drop_up'
      }
      const eventPayload = { order: this.order, sortProp: this.sortProp }
      this.$emit('orderChanged', eventPayload)
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
