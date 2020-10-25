import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

// 공통 CSS
require('./assets/css/common.css')

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (!to.name || to.name.length < 1) {
    next({ path: '/' })
    return
  }

  if (to.name.indexOf('login') < 0 && !store.getters.isLogged) {
    next({ path: '/login' })
    return
  }

  next()
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
