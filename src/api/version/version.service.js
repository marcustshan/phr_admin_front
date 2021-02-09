import { soapUtil } from 'Api'

const service = {
  /**
   * 버전관리 > 목록 조회
   */
  getVersionList () {
    return soapUtil.query(soapUtil.STYPE.GETQUERY, 'SELECT', 'N', 'PC_PHR_GET_VERS_ADM', [{ IN_ADM_SYS_ID: '1' }])
  },
  /**
   * 버전관리 > 상세조회
   */
  getVersionDetail (params) {
    return soapUtil.query(soapUtil.STYPE.GETQUERY, 'SELECT', 'N', 'PC_PHR_GET_VERS_DTL_ADM', params)
  },
  /**
   * 버전관리 > 등록
   */
  writeVersion (params) {
    return soapUtil.query(soapUtil.STYPE.SETQUERY, 'SELECT', 'N', 'PC_PHR_SET_VERS', params)
  },
  /**
   * 버전관리 > 수정, 삭제
   */
  modifyVersion (params) {
    return soapUtil.query(soapUtil.STYPE.SETQUERY, 'SELECT', 'N', 'PC_PHR_SET_VERS_UPD', params)
  }
}

export default service
