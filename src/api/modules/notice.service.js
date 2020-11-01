import api from 'Api'

const pathPrefix = '/api/notice'

const service = {
  /**
   * 공지사항 > 목록 조회
   */
  getNoticeList (params) {
    console.log(params)
    return api.get(`${pathPrefix}/list`, { params })
  },
  getNoticeDetail (noticeSeq) {
    return api.get(`${pathPrefix}/${noticeSeq}`)
  },
  writeNotice (notice) {
    return api.post(`${pathPrefix}/write`, notice)
  },
  modifyNotice (noticeSeq, notice) {
    return api.post(`${pathPrefix}/modify/${noticeSeq}`, notice)
  },
  deleteNotice (noticeSeq) {
    return api.post(`${pathPrefix}/delete/${noticeSeq}`)
  }
}

export default service
