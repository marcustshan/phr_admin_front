import { soapUtil } from 'Api'

const service = {
  /**
   * 공지사항 > 목록 조회
   */
  getNoticeList () {
    return soapUtil.query(soapUtil.STYPE.GETQUERY, 'SELECT', 'N', 'PC_PHR_GET_NTC', [{ IN_USR_SYS_ID: '1' }])
  }
}

export default service
