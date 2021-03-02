import '@babel/polyfill'
import 'es6-promise/auto'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueCryptojs from 'vue-cryptojs'

import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import VueCkeditor from 'vue-ckeditor5'

import VuejsDialog from 'vuejs-dialog'
import 'vuejs-dialog/dist/vuejs-dialog.min.css'

import VueBreadcrumbs from 'vue2-breadcrumbs'

import VueTimepicker from 'vue2-timepicker'
import 'vue2-timepicker/dist/VueTimepicker.css'

// Global Mixin
import GlobalMixin from './globalMixin'

// global filter
import * as filters from './globalFilter'

// global components
import GlobalComponents from './globalComponents'

import './lib/VuetifyCss'

// 공통 CSS
require('./assets/css/common.css')

Vue.use(VueBreadcrumbs)

// global filter
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.use(VueCryptojs)

Vue.use(VueTimepicker)

// Global Mixin
Vue.mixin(GlobalMixin)

Vue.config.productionTip = false

ClassicEditor.defaultConfig = {
  toolbar: {
    items: [
      'heading',
      '|',
      'bold',
      'italic',
      '|',
      'bulletedList',
      'numberedList',
      '|',
      'insertTable',
      '|',
      'undo',
      'redo'
    ]
  },
  image: {
    toolbar: [
      'imageStyle:full',
      'imageStyle:side',
      '|',
      'imageTextAlternative'
    ]
  },
  table: {
    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
  },
  language: 'en'
}
// CKEditor
const options = {
  editors: {
    classic: ClassicEditor
  },
  name: 'ckeditor'
}

Vue.use(VueCkeditor.plugin, options)

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
