<template>
  <div v-if="showLoading">
    <div class="whole-dim"></div>
    <div class="loading-container">
      <div class="loader"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommonLoading',
  computed: {
    showLoading () {
      return this.$store.state.common.showLoading
    }
  }
}
</script>

<style scoped>
  .whole-dim {width: 100%;height: 100%;background-color: #777;opacity: 0.7;z-index: 888;position: fixed;top: 0;left: 0;}
  .loading-container {width: 100%;height: fit-content;z-index: 889;position: fixed;top: 0;left: 0;right: 0;bottom: 0;margin: auto; text-align: center;}
  .loader { border: 10px solid #f3f3f3; border-radius: 50%; border-top: 10px solid #3498db; width: 60px; height: 60px; -webkit-animation: spin 2s linear infinite; /* Safari */ animation: spin 2s linear infinite; margin: auto; }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
