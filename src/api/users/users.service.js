import { soapUtil } from 'Api'

const service = {
  /**
   * 사용자관리 > 목록조회
   */
  getUsersList () {
    return soapUtil.query(soapUtil.STYPE.GETQUERY, 'SELECT', 'N', 'PC_PHR_GET_USR_INFO', [{ IN_ADM_SYS_ID: '1' }])
  },
  /**
   * 사용자관리 > 상세 - 수행내역목록조회
   */
  getUsersDetailList () {
    return soapUtil.query(soapUtil.STYPE.GETQUERY, 'SELECT', 'N', 'PC_PHR_GET_USR_ACT', [{ IN_ADM_SYS_ID: '1' }])
  }
}

export default service
