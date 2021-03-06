import { soapUtil } from 'Api'

const service = {
  /**
   * 관리자 > 1차 로그인
   */
  preLogin (param) {
    return soapUtil.query(soapUtil.STYPE.GETQUERY, 'SELECT', 'N', 'PC_PHR_GET_ADM_LGN_FST', param)
  },
  /**
   * 이메일 인증번호 발송
   */
  emailVerify (systemId) {
    return soapUtil.query(soapUtil.STYPE.GETQUERY, 'SELECT', 'N', 'PC_PHR_SET_CERT', [{ IN_ADM_SYS_ID: systemId }])
  },
  /**
   * 인증번호를 통한 로그인
   */
  login (param) {
    return soapUtil.query(soapUtil.STYPE.GETQUERY, 'SELECT', 'N', 'PC_PHR_GET_ADM_LGN_SCD', param)
  },
  /**
   * 마이페이지 정보 수정
   */
  modifyUserInfo (param) {
    return soapUtil.query(soapUtil.STYPE.SETQUERY, 'SELECT', 'N', 'PC_PHR_SET_ADM_UPD', param)
  },
  /**
   * 로그아웃
   */
  logout (param) {
    soapUtil.query(soapUtil.STYPE.SETQUERY, 'SELECT', 'N', 'PC_PHR_SET_ADM_LOGOUT', param)
  }
}

export default service
