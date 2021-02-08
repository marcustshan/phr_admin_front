// 공지사항 View
const NoticeView = () => import('Views/notice/NoticeView')

// 공지사항 목록
const NoticeList = () => import('Views/notice/NoticeList')

// 공지사항 등록, 수정
const NoticeWrite = () => import('Views/notice/NoticeWrite')

export default {
  path: '/notice',
  name: 'notice',
  redirect: '/notice/list',
  component: NoticeView,
  meta: {
    title: '공지사항',
    breadcrumb: '공지사항'
  },
  children: [
    {
      path: 'list',
      component: NoticeList,
      name: 'noticeList',
      meta: {
        requiresAuth: false,
        auth: true,
        title: '공지사항'
      }
    },
    {
      path: 'modify/:noticeSeq',
      component: NoticeWrite,
      name: 'noticeModify',
      meta: {
        requiresAuth: false,
        auth: true,
        title: '공지사항 > 수정'
      }
    },
    {
      path: 'write',
      component: NoticeWrite,
      name: 'noticeWrite',
      meta: {
        requiresAuth: false,
        auth: true,
        title: '공지사항 > 등록'
      }
    }
  ]
}
