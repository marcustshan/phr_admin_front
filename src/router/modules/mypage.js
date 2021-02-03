// 마이페이지
const MypageView = () => import('Views/mypage/MypageView')

// 마이페이지 비밀번호 확인
const MypageCheck = () => import('Views/mypage/MypageCheck')

// 마이페이지 상세
const MypageDetail = () => import('Views/mypage/MypageDetail')

export default {
  path: '/mypage',
  name: 'mypage',
  redirect: '/mypage/check',
  component: MypageView,
  meta: {
    title: '마이페이지',
    breadcrumb: '마이페이지'
  },
  children: [
    {
      path: 'check',
      component: MypageCheck,
      name: 'mypageCheck',
      meta: {
        requiresAuth: false,
        auth: true,
        title: '마이페이지'
      }
    },
    {
      path: 'detail',
      component: MypageDetail,
      name: 'mypageDetail',
      meta: {
        requiresAuth: false,
        auth: true,
        title: '마이페이지 상세'
      }
    }
  ]
}
