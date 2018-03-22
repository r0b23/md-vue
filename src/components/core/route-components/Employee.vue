<template>
  <div>
    <h1>User</h1>
    <pre>{{ user }}</pre>
  </div>
</template>
<script>
export default {
  data () {
    return {
      user: null,
      project: null
    }
  },
  created () {
    const id = this.$route.params.id
    this.$http.get(`http://localhost:9090/user/id/${id}`)
      .then(response => response.json())
      .then((user) => {
        this.user = user
      })
  }
}
</script>
<style>

</style>
