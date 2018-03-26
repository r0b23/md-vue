<template>
  <div class="content-wrapper">
    <div class="row">
      <h1>Workplaces route</h1>
      <!-- <card-reavel></card-reavel>
      <card-reavel></card-reavel>
      <card-reavel></card-reavel> -->
    </div>
  </div>
</template>
<script>
import CardReavel from '../../shared/MaterialCardReaveal'
export default {
  data () {
    return {
      projects: null
    }
  },
  created () {
    this.$http.get('project/all').then(response => response.json())
      .then((projects) => {
        this.projects = projects
      })
  },
  components: {
    cardReavel: CardReavel
  }
}
</script>
