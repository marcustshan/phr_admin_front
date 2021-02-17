import { soapUtil } from 'Api'

const service = {
  /**
   * 사용자관리 > 목록조회
   */
  getUsersList (param) {
    return soapUtil.query(soapUtil.STYPE.GETQUERY, 'SELECT', 'N', 'PC_PHR_GET_USR_INFO', [{ IN_ADM_SYS_ID: param.sysId, IN_CURR_PAGE_NO: param.page }])
  },
  /**
   * 사용자관리 > 상세 - 수행내역목록조회
   */
  getUsersDetailList (param) {
    return soapUtil.query(soapUtil.STYPE.GETQUERY, 'SELECT', 'N', 'PC_PHR_GET_USR_ACT', [{ IN_ADM_SYS_ID: param.sysId, IN_USR_SYS_ID: param.userId }])
  }
}

export default service
