/* eslint-disable space-before-function-paren */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */

// user.js
const state = {
  userInfo: { id: 1, name: '한태식' },
  isLogged: false
}

const getters = {
  isLogged: state => {
    return Object.keys(state.userInfo).length > 0
  }
}

const actions = {
  setUserInfo(context, value) {
    context.commit('setUserInfo', value)
  }
}

const mutations = {
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
