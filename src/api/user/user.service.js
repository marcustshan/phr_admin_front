import { soapUtil } from 'Api'

const service = {
  /**
   * 사용자 > 로그인
   */
  login () {
    return soapUtil.query(soapUtil.STYPE.GETQUERY, 'SELECT', 'N', 'PC_PHR_GET_NTC', [{ IN_USR_SYS_ID: '1' }])
  }
}

export default service
