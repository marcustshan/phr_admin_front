import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueCryptojs from 'vue-cryptojs'

import VuejsDialog from 'vuejs-dialog'
import 'vuejs-dialog/dist/vuejs-dialog.min.css'

import VueBreadcrumbs from 'vue2-breadcrumbs'

import VueTimepicker from 'vue2-timepicker'
import 'vue2-timepicker/dist/VueTimepicker.css'

// Global Mixin
import GlobalMixin from './globalMixin'

// global components
import GlobalComponents from './globalComponents'

import axios from 'axios'

import './lib/VuetifyCss'

// 공통 CSS
require('./assets/css/common.css')

Vue.use(VueBreadcrumbs)

Vue.use(VueCryptojs)

Vue.use(VueTimepicker)

// Global Mixin
Vue.mixin(GlobalMixin)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (!to.name || to.name.length < 1) {
    next({ path: '/' })
    return
  }

  /*
  if (to.name.indexOf('login') < 0 && !store.getters.isLogged) {
    next({ path: '/login' })
    return
  }
  */

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
    store.dispatch('common/setShowProgress', true)
    return config
  },
  (error) => {
    store.dispatch('common/setShowProgress', false)
    Promise.reject(error)
  }
)

// 응답(response) 인터셉터
service.interceptors.response.use(
  (response) => {
    store.dispatch('common/setShowProgress', false)
    return Promise.resolve(response)
  },
  (error) => {
    store.dispatch('common/setShowProgress', false)
    return Promise.reject(error)
  }
)
Vue.prototype.$axios = service

Vue.use(VuejsDialog, {
  html: true,
  okText: '확인',
  cancelText: '취소'
})

Vue.use(GlobalComponents)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
