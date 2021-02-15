/* eslint-disable space-before-function-paren */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */

import router from '@/router'

// import store from '@/store'
import userService from 'Api/user/user.service'

// user.js
const state = {
  // userInfo: { id: 1, name: '한태식' },
  userInfo: null,
  isLogged: false
}

const getters = {
  isLogged: state => {
    let logYn = false
    if (state.userInfo !== null) {
      logYn = true
    }
    return logYn
  },
  userInfo: state => {
    return state.userInfo
  }
}

const actions = {
  async preLogin ({ commit }, { IN_ADM_ID, IN_ADM_PW }) {
    // 1차 로그인
    const res = await userService.preLogin({ IN_ADM_ID, IN_ADM_PW })
    if (res.data) {
      return Promise.resolve(res.data[0])
    }
  },
  // 이메일 인증
  async emailVerify ({ commit }, { certNum }) {
    const res = await userService.emailVerify(certNum)
    return Promise.resolve(res.data[0])
  },
  // 인증번호를 통한 로그인
  async login ({ commit }, { IN_ADM_ID, IN_ADM_PW, IN_CERT_NUM }) {
    const res = await userService.login({ IN_ADM_ID, IN_ADM_PW, IN_CERT_NUM })
    if (res.data) {
      // 사용자 정보 store에 저장
      // commit('setJWTToken', res.headers['jwt-header'])
      commit('setUserInfo', res.data[0])
      return Promise.resolve(res.data[0])
    }
  },
  // 관리자 정보
  userInfo(context, value) {
    context.commit('setUserInfo', value)
  },
  // 로그아웃
  async logout ({ commit }) {
    // commit('setJWTToken', null)
    commit('setUserInfo', null)
    router.push('/login')
    return Promise.resolve()
  }
}

const mutations = {
  setUserInfo (state, userInfo) {
    state.userInfo = userInfo || {
      loginId: null,
      id: null,
      name: null
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
