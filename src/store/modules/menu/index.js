/* eslint-disable space-before-function-paren */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */

// menu
const state = {
  menus: []
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
  state,
  actions,
  mutations
}
