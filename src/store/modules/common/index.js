/* eslint-disable space-before-function-paren */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */

const state = {
  prod_baseUrl: '/api',
  dev_baseUrl: '/api',
  timeout: 10000,
  showLoading: false,
  showDialog: false
}

const getters = {
  baseUrl: state => {
    return process.env.WEBPACK_DEV_SERVER ? state.dev_baseUrl : state.prod_baseUrl
  }
}

const actions = {
  setBaseUrl(context, value) {
    context.commit('setBaseUrl', value)
  },
  setShowLoading(context, value) {
    context.commit('setShowLoading', value)
  },
  setShowDialog(context, value) {
    context.commit('setShowDialog', value)
  }
}

const mutations = {
  setBaseUrl(state, baseUrl) {
    state.baseUrl = baseUrl
  },
  setShowLoading(state, showLoading) {
    state.showLoading = showLoading
  },
  setShowDialog(state, showDialog) {
    state.showDialog = showDialog
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
