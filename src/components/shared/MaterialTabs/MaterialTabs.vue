<template>
  <div class="card-panel tabs-wrapper">
    <div class="row">
      <div class="col s12">
        <ul class="tabs blue lighten-1 z-depth-1" ref="tabHeaderContainer">
          <material-tab-header
            v-for="tab in tabs" :key="tab.title"
            :ref="tab.ref"
            @click.native="onActivateTab($event, tab)"
            :active="tab.active"
            :tabTitle="tab.title"/>
          <mat-indicator :position="position"/>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import MaterialTabHeader from './MaterialTabHeader'
import MatIndicator from './MaterialIndicator'
export default {
  data () {
    return {
      position: {}
    }
  },
  props: {
    tabs: {
      type: Array,
      required: true
    }
  },
  computed: {
    activeTab () {
      return this.tabs.find(tab => tab.active)
    }
  },
  methods: {
    tabHeaderClass (index) {
      // Later add support for more than 12 tab headers(scrolling tab)
      const numberOfTabs = this.tabs.length
      const colClass = `s${12 / numberOfTabs}`
      return {
        [colClass]: true,
        disabled: this.tabs[index].disabled
      }
    },
    onActivateTab (event, tab) {
      if (tab.action(event)) {
        const activeTab = this.tabs.find(tab => tab.active)
        activeTab.active = false
        tab.active = true
        this.setIndicatorWidth()
      }
    },
    setIndicatorWidth () {
      const activeTaboffsetLeft = this.$refs[this.activeTab.ref][0].$el.offsetLeft
      const activeTabWidth = this.$refs[this.activeTab.ref][0].$el.clientWidth
      const containerLength = this.$refs.tabHeaderContainer.clientWidth

      this.position = {
        right: `${containerLength - (activeTaboffsetLeft + activeTabWidth)}px`,
        left: `${activeTaboffsetLeft}px`
      }
    }
  },
  components: {
    materialTabHeader: MaterialTabHeader,
    matIndicator: MatIndicator
  },
  mounted () {
    this.setIndicatorWidth()
  }
}
</script>
<style>
  .card-panel.tabs-wrapper {
    padding: 0;
  }
</style>
