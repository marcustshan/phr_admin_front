/* eslint-disable space-before-function-paren */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */

// menu
const state = {
  menus: [
    {
      name: '메인화면',
      path: '/main',
      showMenu: false
    },
    {
      name: '게시판 관리',
      path: '/notice',
      children: [
        { name: '공지사항', path: '/notice', showMenu: true }
      ],
      showMenu: true
    },
    {
      name: '메뉴1',
      path: '/',
      children: [
        { name: '메뉴1 - 1', path: '/', showMenu: true },
        { name: '메뉴1 - 2', path: '/', showMenu: true },
        { name: '메뉴1 - 3', path: '/', showMenu: true },
        { name: '메뉴1 - 4', path: '/', showMenu: true }
      ],
      showMenu: true
    },
    {
      name: '메뉴2',
      path: '/',
      children: [
        { name: '메뉴2 - 1', path: '/', showMenu: true },
        { name: '메뉴2 - 2', path: '/', showMenu: true },
        { name: '메뉴2 - 3', path: '/', showMenu: true },
        { name: '메뉴2 - 4', path: '/', showMenu: true }
      ],
      showMenu: true
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
