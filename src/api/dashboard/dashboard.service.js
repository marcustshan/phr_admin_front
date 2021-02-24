import { soapUtil } from 'Api'

const service = {
  /**
   * 대시보드 > 일일 운영 현황 조회
   */
  getDailyStatData (param) {
    return soapUtil.query(soapUtil.STYPE.GETQUERY, 'SELECT', 'N', 'PC_PHR_GET_DAILY_STAT', {
      IN_ADM_SYS_ID: param.sysId
    })
  }
}

export default service
