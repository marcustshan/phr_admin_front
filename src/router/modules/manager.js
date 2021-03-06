// 관리자 계정 관리
const ManagerView = () => import('Views/manager/ManagerView')
// 관리자 계정 관리 목록
const ManagerList = () => import('Views/manager/ManagerList')
// 관리자 계정관리 상세
const ManagerDetail = () => import('Views/manager/ManagerDetail')
// 관리자 계정관리 등록
const ManagerWrite = () => import('Views/manager/ManagerWrite')
// 관리자 계정관리 수정
const ManagerModify = () => import('Views/manager/ManagerModify')

export default {
  path: '/manager',
  name: 'manager',
  redirect: '/manager/list',
  component: ManagerView,
  meta: {
    title: '관리자 계정관리',
    breadcrumb: '관리자 계정관리'
  },
  children: [
    {
      path: 'list',
      component: ManagerList,
      name: 'managerList',
      meta: {
        requiresAuth: false,
        auth: true,
        title: '관리자 계정관리'
      }
    },
    {
      path: 'detail',
      component: ManagerDetail,
      name: 'managerDetail',
      meta: {
        requiresAuth: false,
        auth: true,
        title: '관리자 계정관리 > 상세',
        possibleSameMenuMove: true
      }
    },
    {
      path: 'write',
      component: ManagerWrite,
      name: 'managerWrite',
      meta: {
        requiresAuth: false,
        auth: true,
        title: '관리자 계정관리 > 등록',
        possibleSameMenuMove: true
      }
    },
    {
      path: 'modify',
      component: ManagerModify,
      name: 'managerModify',
      meta: {
        requiresAuth: false,
        auth: true,
        title: '관리자 계정관리 > 계정 수정',
        possibleSameMenuMove: true
      }
    }
  ]
}
