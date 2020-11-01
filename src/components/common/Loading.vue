<template>
  <div>
    <div class="whole_dim" v-show="showProgress || showLayerPopup"></div>
    <div class="loading_container" v-show="showProgress">
      <div class="loader"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommonLoading',
  computed: {
    showProgress () {
      return this.$store.state.common.showProgress
    },
    showLayerPopup () {
      return this.$store.state.common.showLayerPopup
    }
  },
  methods: {
  }
}
</script>

<style scoped>
  .whole_dim {width: 100%;height: 100%;background-color: #777;opacity: 0.7;z-index: 888;position: absolute;top: 0;left: 0;}
  .loading_container {width: 400px;height: 200px;z-index: 889;position: absolute;top: 0;left: 0;right: 0;bottom: 0;margin: auto; text-align: center;}
  .loader { border: 16px solid #f3f3f3; border-radius: 50%; border-top: 16px solid #3498db; width: 120px; height: 120px; -webkit-animation: spin 2s linear infinite; /* Safari */ animation: spin 2s linear infinite; margin: auto; }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
