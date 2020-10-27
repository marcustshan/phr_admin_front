/* eslint-disable space-before-function-paren */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */

const state = {
  prod_baseUrl: '/api',
  dev_baseUrl: '/api',
  timeout: 10000,
  nowLoading: false,
  showLayerPopup: false
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
  setNowLoading(context, value) {
    context.commit('setNowLoading', value)
  },
  setShowLayerPopup(context, value) {
    context.commit('setShowLayerPopup', value)
  }
}

const mutations = {
  setBaseUrl(state, baseUrl) {
    state.baseUrl = baseUrl
  },
  setNowLoading(state, isLoading) {
    state.nowLoading = isLoading
  },
  setShowLayerPopup(state, showLayerPopup) {
    state.showLayerPopup = showLayerPopup
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
