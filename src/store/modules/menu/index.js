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
        { name: '메뉴1 - 1', path: '/menu/11', showMenu: true },
        { name: '메뉴1 - 2', path: '/menu/12', showMenu: true },
        { name: '메뉴1 - 3', path: '/menu/13', showMenu: true },
        { name: '메뉴1 - 4', path: '/menu/14', showMenu: true },
        { name: '메뉴1 - 5', path: '/menu/15', showMenu: true },
        { name: '메뉴1 - 6', path: '/menu/16', showMenu: true },
        { name: '메뉴1 - 7', path: '/menu/17', showMenu: true },
        { name: '메뉴1 - 8', path: '/menu/18', showMenu: true },
        { name: '메뉴1 - 9', path: '/menu/19', showMenu: true }
      ],
      showMenu: true
    },
    {
      name: '메뉴2',
      path: '/',
      children: [
        { name: '메뉴2 - 1', path: '/menu/21', showMenu: true },
        { name: '메뉴2 - 2', path: '/menu/22', showMenu: true },
        { name: '메뉴2 - 3', path: '/menu/23', showMenu: true },
        { name: '메뉴2 - 4', path: '/menu/24', showMenu: true },
        { name: '메뉴2 - 5', path: '/menu/25', showMenu: true },
        { name: '메뉴2 - 6', path: '/menu/26', showMenu: true },
        { name: '메뉴2 - 7', path: '/menu/27', showMenu: true },
        { name: '메뉴2 - 8', path: '/menu/28', showMenu: true },
        { name: '메뉴2 - 9', path: '/menu/29', showMenu: true }
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
