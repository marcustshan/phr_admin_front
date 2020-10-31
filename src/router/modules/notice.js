// 공지사항 목록
const NoticeList = () => import('Views/notice/NoticeList')

// 공지사항 상세 or 수정
const NoticeDetail = () => import('Views/notice/NoticeDetail')

// 공지사항 등록
const NoticeWrite = () => import('Views/notice/NoticeWrite')

export default {
  path: '/notice',
  name: 'notice',
  redirect: '/notice/list',
  component: NoticeList,
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
        title: '공지사항 목록'
      }
    },
    {
      path: 'detail/:seq',
      component: NoticeDetail,
      name: 'noticeDetail',
      meta: {
        requiresAuth: false,
        auth: true,
        title: '공지사항 상세'
      }
    },
    {
      path: 'write',
      component: NoticeWrite,
      name: 'noticeWrite',
      meta: {
        requiresAuth: false,
        auth: true,
        title: '공지사항 등록'
      }
    }
  ]
}
