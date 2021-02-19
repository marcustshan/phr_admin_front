import { soapUtil } from 'Api'

const service = {
  /**
   * 공지사항 > 목록 조회
   */
  getNoticeList (param) {
    return soapUtil.query(soapUtil.STYPE.GETQUERY, 'SELECT', 'N', 'PC_PHR_GET_NTC_ADM', [{
      IN_ADM_SYS_ID: param.sysId,
      IN_CURR_PAGE_NO: param.page,
      IN_SEARCH_TYPE: param.type,
      IN_SEARCH_CONTENT: param.search
    }])
  },
  /**
   * 공지사항 > 상세조회
   */
  getNoticeDetail (params) {
    return soapUtil.query(soapUtil.STYPE.GETQUERY, 'SELECT', 'N', 'PC_PHR_GET_NTC_DTL_ADM', params)
  },
  /**
   * 공지사항 > 등록
   */
  writeNotice (params) {
    return soapUtil.query(soapUtil.STYPE.SETQUERY, 'SELECT', 'N', 'PC_PHR_SET_NTC', params)
  },
  /**
   * 공지사항 > 수정, 삭제
   */
  modifyNotice (params) {
    return soapUtil.query(soapUtil.STYPE.SETQUERY, 'SELECT', 'N', 'PC_PHR_SET_NTC_UPD', params)
  }
}

export default service
