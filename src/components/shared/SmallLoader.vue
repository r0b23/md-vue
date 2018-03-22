<template>
  <div class="loader-wrapper">
    <div class="preloader-wrapper big active">
      <div class="spinner-layer spinner-blue-only">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style>
  .loader-wrapper {
    position: absolute;
    top: 48px;
    width: 100%;
    height: calc(100% - 48px);
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    background-color: red;
    background-color: rgba(255, 255, 255,0.8);
    z-index: 1000;
}
</style>
