import { soapUtil } from 'Api'

const service = {
  /**
   * 버전관리 > 목록 조회
   */
  getVersionList (param) {
    return soapUtil.query(soapUtil.STYPE.GETQUERY, 'SELECT', 'N', 'PC_PHR_GET_VERS_ADM', [{
      IN_ADM_SYS_ID: param.sysId,
      IN_CURR_PAGE_NO: param.page,
      IN_SEARCH_TYPE: param.type,
      IN_SEARCH_CONTENT: param.search
    }])
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
  },
  /**
   * 버전관리 > 등록된 버전 코드 존재 여부 조회
   */
  checkExistVersion (params) {
    return soapUtil.query(soapUtil.STYPE.SETQUERY, 'SELECT', 'N', 'PC_PHR_GET_VERS_EXIST', params)
  }
}

export default service
