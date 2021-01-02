import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import xjs from 'xml-js'

const api = axios.create({
  baseURL: '/api/admin', // api의 base_url
  headers: {
    Accept: 'application/json',
    'Content-Type': 'text/xml; charset=utf-8',
    SoapAction: 'http://tempuri.org/IMGPHRService/ServiceReturnCustomType'
  },
  timeout: process.env.NODE_ENV === 'production' ? 60000 : 120000 // 요청 제한 시간 (운영: 1분 | 개발: 2분)
})

// 에러 카운트
let errorCount = 0

// 요청(request) 인터셉터
api.interceptors.request.use(
  (config) => {
    store.dispatch('common/setShowLoading', true)
    return config
  },
  (error) => {
    // Do something with request error
    store.dispatch('common/setShowLoading', false)
    Promise.reject(error)
  }
)

// 응답(response) 인터셉터
api.interceptors.response.use(
  (response) => {
    store.dispatch('common/setShowLoading', false)
    response.data = JSON.parse(soapUtil.parseResponse(response.data))
    if (response.data) {
      if (response.data.RESULT && response.data.RESULT.length > 0) {
        if (response.data.RESULT[0]['NO-DATA'] && response.data.RESULT[0]['NO-DATA'].length > 0) {
          response.data = undefined
        } else {
          response.data = response.data.RESULT
        }
      }
    }
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

    store.dispatch('common/setShowLoading', false)

    return Promise.reject(error)
  }
)

const soapUtil = {
  STYPE: {
    GETQUERY: 'GETQUERY',
    SETQUERY: 'SETQUERY',
    RESTFUL: 'RESTFUL_PHR_GW'
  },
  ServiceUserID: 'PPHR',
  syncQuery: async (sType, qType, sEncYn, sQid, params) => {
    const envelope = soapUtil.createQueryEnvelope(sType, qType, sEncYn, sQid, soapUtil.ServiceUserID, params)
    // axios의 baseURL에 설정되어 있기 때문에 빈 URL로 통신함
    const response = await api.post('', envelope)
    return response
  },
  query: (sType, qType, sEncYn, sQid, params) => {
    const envelope = soapUtil.createQueryEnvelope(sType, qType, sEncYn, sQid, soapUtil.ServiceUserID, params)
    // axios의 baseURL에 설정되어 있기 때문에 빈 URL로 통신함
    return api.post('', envelope)
  },
  createQueryEnvelope: (sType, qType, sEncYn, sQid, sUserID, params) => {
    let sParams = ''
    if (Array.isArray(params)) {
      const paramsLength = params.length
      for (let i = 0; i < paramsLength; i++) {
        for (const key in params[i]) {
          sParams += `"${key}":"${params[i][key]}",`
        }
      }
    } else {
      for (const key in params) {
        sParams += `"${key}":"${params[key]}",`
      }
    }
    sParams = sParams.substring(0, sParams.length - 1)

    return `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
              <soapenv:Header/>
              <soapenv:Body>
                <tem:ServiceReturnCustomType>
                <tem:sType>${sType}</tem:sType>
                <tem:sInputType>JSON</tem:sInputType>
                <tem:sOutputType>JSON</tem:sOutputType>
                <tem:sEncYn>${sEncYn}</tem:sEncYn>
                <tem:sParam>
                <![CDATA[
                  {
                    "Table":[
                      {
                        "QID":"${sQid}",
                        "QTYPE":"${qType}",
                        "USERID":"${sUserID}",
                        "EXECTYPE":"FILL",
                        "TABLENAME":"RESULT",
                        ${sParams}
                      }
                    ]
                  }
                ]]>
                </tem:sParam>
                <tem:sToken><![CDATA[]]></tem:sToken>
                <tem:sVerifyYn><![CDATA[N]]></tem:sVerifyYn>
                </tem:ServiceReturnCustomType>
              </soapenv:Body>
            </soapenv:Envelope>
            `
  },
  parseResponse: (data) => {
    if (data != null) {
      const jsBody = xjs.xml2js(data, { compact: true, spaces: 4 })
      const jsonBody = jsBody['s:Envelope']['s:Body'].ServiceReturnCustomTypeResponse.ServiceReturnCustomTypeResult._text
      return jsonBody
    } else {
      return null
    }
  }
}

export { api, soapUtil }
