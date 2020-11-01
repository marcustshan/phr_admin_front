import Vue from 'vue'
import axios from 'axios'
import store from '@/store'

const service = axios.create({
  baseURL: '', // api의 base_url
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=utf-8',
    Progress: true // default 는 true 로 돌게 한다.
  },
  timeout: process.env.NODE_ENV === 'production' ? 60000 : 120000 // 요청 제한 시간 (운영: 1분 | 개발: 2분)
})

// 에러 카운트
let errorCount = 0

// 요청(request) 인터셉터
service.interceptors.request.use(
  (config) => {
    // Progress 를 돌려야되는 경우  true (default)
    store.dispatch('common/setShowProgress', true)
    service.defaults.headers.Progress = true

    return config
  },
  (error) => {
    // Do something with request error
    store.dispatch('common/setShowProgress', false)
    Promise.reject(error)
  }
)

// 응답(response) 인터셉터
service.interceptors.response.use(
  (response) => {
    // 페이징 객체 설정
    if (response.headers) {
      response.pagination = {
        page: parseInt(response.headers['X-Current-Page'.toLowerCase()] || '1', 10),
        total: parseInt(response.headers['X-Total-Count'.toLowerCase()] || '0', 10),
        pageSize: parseInt(response.headers['X-Data-Per-Page'.toLowerCase()] || '10', 10)
      }
    }
    store.dispatch('common/setShowProgress', false)
    return Promise.resolve(response)
  },
  (error) => {
    let authFail = false
    // 인증 토큰을 확인해야될 로직 추가
    let errorTitle = '오류'
    let errorMsg = '일시적인 오류가 발생하였습니다.<br />문제가 지속되면 관리자에게 문의부탁드립니다.'
    if (error && error.response && error.response.status) {
      if (error.response.status === 401) {
        errorTitle = '인증 불가'
        errorMsg = '인증 정보가 존재하지 않습니다.<br />다시 로그인 해 주세요.'
        if (error.response.data && error.response.data.msg) {
          errorMsg = error.response.data.msg
        }
        authFail = true
      } else if (error.response.status === 406) {
        errorMsg = '해당 요청에 대한 권한이 없습니다.'
      } else if (error.response.status === 504 || error.message.indexOf('timeout') === 0) {
        errorMsg = '서버가 응답하고 있지 않습니다.<br />먼저 인터넷 연결을 확인해 주시고 문제가 계속되면 관리자에게 문의바랍니다.'
      } else if (error.response.status === 400 && error.response.data && error.response.data.message) {
        errorMsg = error.response.data.message
      }
    }
    if (errorCount === 0) {
      errorCount++
      Vue.dialog.alert({
        title: errorTitle,
        body: errorMsg
      }).then(() => {
        if (authFail) {
          store.dispatch('auth/logout')
        }
        errorCount = 0
      }).catch(() => {})
    }

    store.dispatch('common/setShowProgress', false)

    return Promise.reject(error)
  }
)

export default service
