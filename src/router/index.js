import Vue from 'vue'
import VueRouter from 'vue-router'

// 로그인 화면
const login = () => import('../views/Login')
// 메인 화면
const main = () => import('../views/Main')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    component: main,
    name: 'main',
    meta: {
      title: '메인',
      breadcrumb: 'Main'
    }
  },
  {
    path: '/login',
    component: login,
    name: 'login',
    meta: {
      title: '로그인',
      breadcrumb: 'Login'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
