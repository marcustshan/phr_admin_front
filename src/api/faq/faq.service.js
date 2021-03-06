import { soapUtil } from 'Api'

const service = {
  /**
   * 자주묻는질문 > 목록 조회
   */
  getFaqList (param) {
    return soapUtil.query(soapUtil.STYPE.GETQUERY, 'SELECT', 'N', 'PC_PHR_GET_FAQ_ADM', [{
      IN_ADM_SYS_ID: param.sysId,
      IN_CURR_PAGE_NO: param.page,
      IN_SEARCH_TYPE: param.type,
      IN_SEARCH_CONTENT: param.search
    }])
  },
  /**
   * 자주묻는질문 > 상세조회
   */
  getFaqDetail (params) {
    return soapUtil.query(soapUtil.STYPE.GETQUERY, 'SELECT', 'N', 'PC_PHR_GET_FAQ_DTL_ADM', params)
  },
  /**
   * 자주묻는질문 > 등록
   */
  writeFaq (params) {
    return soapUtil.query(soapUtil.STYPE.SETQUERY, 'SELECT', 'N', 'PC_PHR_SET_FAQ', params)
  },
  /**
   * 자주묻는질문 > 수정, 삭제
   */
  modifyFaq (params) {
    return soapUtil.query(soapUtil.STYPE.SETQUERY, 'SELECT', 'N', 'PC_PHR_SET_FAQ_UPD', params)
  }
}

export default service
