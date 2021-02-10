import { soapUtil } from 'Api'

const service = {
  /**
   * 관리자 계정관리 > 목록 조회
   */
  getManagerList () {
    return soapUtil.query(soapUtil.STYPE.GETQUERY, 'SELECT', 'N', 'PC_PHR_GET_ADM_INFO', [{ IN_ADM_SYS_ID: '1' }])
  },
  /**
   * 관리자 계정관리 > 상세 - 수행내역목록조회
   */
  getManagerDetailList () {
    return soapUtil.query(soapUtil.STYPE.GETQUERY, 'SELECT', 'N', 'PC_PHR_GET_ADM_ACT', [{ IN_ADM_SYS_ID: '1' }])
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
    return soapUtil.query(soapUtil.STYPE.SETQUERY, 'SELECT', 'N', 'PC_PHR_SET_ADM_UPD', params)
  }
}

export default service
