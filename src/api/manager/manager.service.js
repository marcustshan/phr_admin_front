import { soapUtil } from 'Api'

const service = {
  /**
   * 관리자 계정관리 > 목록 조회
   */
  getManagerList (param) {
    return soapUtil.query(soapUtil.STYPE.GETQUERY, 'SELECT', 'N', 'PC_PHR_GET_ADM_INFO', [{
      IN_ADM_SYS_ID: param.sysId,
      IN_CURR_PAGE_NO: param.page
    }])
  },
  /**
   * 관리자 계정관리 > 상세 조회
   */
  getManagerDetail (param) {
    return soapUtil.query(soapUtil.STYPE.SETQUERY, 'SELECT', 'N', 'PC_PHR_GET_ADM_DTL', [{
      IN_ADM_SYS_ID: param.IN_ADM_SYS_ID,
      IN_MNGR_SYS_NO: param.IN_MNGR_SYS_NO
    }])
  },
  /**
   * 관리자 계정관리 > 상세 - 수행내역목록조회
   */
  getManagerDetailList (param) {
    return soapUtil.query(soapUtil.STYPE.GETQUERY, 'SELECT', 'N', 'PC_PHR_GET_ADM_ACT',
      [{
        IN_ADM_SYS_ID: param.IN_ADM_SYS_ID,
        IN_M_ADM_SYS_ID: param.IN_MNGR_SYS_NO,
        IN_CURR_PAGE_NO: param.page,
        IN_SEARCH_CONTENT: param.search,
        IN_START_DATE: param.startDt,
        IN_END_DATE: param.endDt
      }])
  },
  /**
   * 관리자 계정관리 > 등록
   */
  writeManager (params) {
    return soapUtil.query(soapUtil.STYPE.SETQUERY, 'SELECT', 'N', 'PC_PHR_SET_ADM', params)
  },
  /**
   * 관리자 계정관리 > 삭제
   */
  deleteManager (params) {
    return soapUtil.query(soapUtil.STYPE.SETQUERY, 'SELECT', 'N', 'PC_PHR_SET_ADM_DEL', params)
  },
  /**
   * 관리자 계정관리 > 비밀번호 초기화
   */
  resetManagePw (params) {
    return soapUtil.query(soapUtil.STYPE.SETQUERY, 'SELECT', 'N', 'PC_PHR_SET_ADM_PW_INIT', params)
  },
  /**
   * 관리자 계정관리 > 장기 미접속 해제
   */
  dorYnManage (params) {
    return soapUtil.query(soapUtil.STYPE.SETQUERY, 'SELECT', 'N', 'PC_PHR_SET_ADM_DOR_INIT', params)
  }
}

export default service
