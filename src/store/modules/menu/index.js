/* eslint-disable space-before-function-paren */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */

// menu
const state = {
  menus: [
    /*
    {
      name: '대시보드',
      path: '/main',
      showMenu: true
    },
    */
    {
      name: '사용자 관리',
      path: '/users',
      showMenu: true,
      mstMenu: false
    },
    {
      name: '공지사항',
      path: '/notice',
      showMenu: true,
      mstMenu: false
    },
    {
      name: '자주 묻는 질문',
      path: '/faq',
      showMenu: true,
      mstMenu: false
    },
    {
      name: '버전 관리',
      path: '/version',
      showMenu: true,
      mstMenu: false
    },
    {
      name: '마이 페이지',
      path: '/mypage',
      showMenu: true,
      mstMenu: false
    },
    {
      name: '관리자 계정 관리',
      path: '/manager',
      showMenu: true,
      mstMenu: true
    }
  ]
}

const actions = {
  setMenus(context, value) {
    context.commit('setMenus', value)
  }
}

const mutations = {
  setMenus(state, menus) {
    state.menus = menus
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
