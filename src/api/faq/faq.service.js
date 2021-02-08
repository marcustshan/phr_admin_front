import { soapUtil } from 'Api'

const service = {
  /**
   * 자주묻는질문 > 목록 조회
   */
  getFaqList () {
    return soapUtil.query(soapUtil.STYPE.GETQUERY, 'SELECT', 'N', 'PC_PHR_GET_FAQ_ADM', [{ IN_ADM_SYS_ID: '1' }])
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
