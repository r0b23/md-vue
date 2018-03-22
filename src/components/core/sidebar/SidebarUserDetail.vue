<template>
  <li>
    <div class="user-view">
      <div class="background">
        <img src="../../../assets/user-bg.jpg">
      </div>
      <div class="user-info-wrapper">
        <a href="#!name"><span class="white-text name">{{user.lastname}} {{user.firstname}}</span></a>
        <i class="details-menu material-icons">arrow_drop_down</i>
        <a href="#!email"><span class="white-text email">{{user.email}}</span></a>
      </div>
    </div>
  </li>
</template>
<script>
export default {
  computed: {
    user () {
      return this.$store.getters.user
    }
  }
}
</script>
<style>
  .user-info-wrapper {
    position: relative;
  }
  .side-nav .user-view .user-info-wrapper a span.name,
  .side-nav .user-view .user-info-wrapper a span.email {
    font-weight: bold;
  }
  .details-menu {
    color: white;
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
  }
</style>
