import Vue from 'vue'
import VueRouter from 'vue-router'

import NoticeRoutes from './modules/notice'

// 로그인 화면
const Login = () => import('Views/Login')
// 메인 화면
const Main = () => import('Views/Main')

const Menu = () => import('Views/Menu')

Vue.use(VueRouter)

const routes = [
  NoticeRoutes,
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/main',
    component: Main,
    name: 'main',
    meta: {
      title: '메인화면',
      breadcrumb: 'Main'
    }
  },
  {
    path: '/login',
    component: Login,
    name: 'login',
    meta: {
      title: '로그인',
      breadcrumb: 'Login'
    }
  },
  {
    path: '/menu/:menuName',
    component: Menu,
    name: 'menu',
    meta: {
      title: '메뉴',
      breadcrumb: 'Menu'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
