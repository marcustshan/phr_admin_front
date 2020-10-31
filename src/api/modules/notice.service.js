import api from 'Api'

const pathPrefix = '/api/notice'

const service = {
  /**
   * 공지사항 > 목록 조회
   */
  getNoticeList () {
    return api.get(`${pathPrefix}/list`)
  },
  getNoticeDetail (noticeSeq) {
    return api.get(`${pathPrefix}/${noticeSeq}`)
  },
  writeNotice (notice) {
    return api.post(`${pathPrefix}/write`, notice)
  }
}

export default service
