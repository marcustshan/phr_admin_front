import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import axios from 'axios'

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

const service = axios.create({
  baseURL: store.getters.baseUrl, // api의 base_url
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json;charset=utf-8'
  },
  timeout: store.state.common.timeout // 요청 제한 시간 (10초)
})

// 요청(request) 인터셉터
service.interceptors.request.use(
  (config) => {
    store.dispatch('setNowLoading', true)
    return config
  },
  (error) => {
    store.dispatch('setNowLoading', false)
    alert(error.message, 'Choose Lunch')
    Promise.reject(error)
  }
)

// 응답(response) 인터셉터
service.interceptors.response.use(
  (response) => {
    store.dispatch('setNowLoading', false)
    return Promise.resolve(response)
  },
  (error) => {
    store.dispatch('setNowLoading', false)
    alert(error.message, 'Choose Lunch')
    return Promise.reject(error)
  }
)
Vue.prototype.$axios = service

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
