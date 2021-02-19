import { soapUtil } from 'Api'

const service = {
  /**
   * 사용자관리 > 목록조회
   */
  getUsersList (param) {
    return soapUtil.query(soapUtil.STYPE.GETQUERY, 'SELECT', 'N', 'PC_PHR_GET_USR_INFO', [{
      IN_ADM_SYS_ID: param.sysId,
      IN_CURR_PAGE_NO: param.page,
      IN_SEARCH_TYPE: param.type,
      IN_SEARCH_CONTENT: param.search
    }])
  },
  /**
   * 사용자관리 > 상세조회
   */
  getUserDetail (param) {
    return soapUtil.query(soapUtil.STYPE.GETQUERY, 'SELECT', 'N', 'PC_PHR_GET_USR_INFO_DTL', [{
      IN_ADM_SYS_ID: param.ADM_SYS_ID,
      IN_USR_SYS_ID: param.USR_SYS_ID
    }])
  },
  /**
   * 사용자관리 > 상세 - 수행내역목록조회
   */
  getUsersDetailList (param) {
    return soapUtil.query(soapUtil.STYPE.GETQUERY, 'SELECT', 'N', 'PC_PHR_GET_USR_EXC_LOG', [{
      IN_ADM_SYS_ID: param.sysId,
      IN_USR_SYS_ID: param.userId,
      IN_CURR_PAGE_NO: param.page,
      IN_SEARCH_TYPE: param.type,
      IN_START_DATE: param.startDt,
      IN_END_DATE: param.endDt
    }])
  }
}

export default service
