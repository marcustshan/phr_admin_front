// 관리자 계정 관리
const ManagerView = () => import('Views/manager/ManagerView')

// 관리자 계정 관리 목록
const ManagerList = () => import('Views/manager/ManagerList')

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
    }
  ]
}
