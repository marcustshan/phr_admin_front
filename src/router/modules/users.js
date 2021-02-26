// 사용자 관리
const UsersView = () => import('Views/users/UsersView')

// 사용자관리 목록
const UsersList = () => import('Views/users/UsersList')

// 사용자관리 상세
const UsersDetail = () => import('Views/users/UsersDetail')

export default {
  path: '/users',
  name: 'users',
  redirect: '/users/list',
  component: UsersView,
  meta: {
    title: '사용자관리',
    breadcrumb: '사용자관리'
  },
  children: [
    {
      path: 'list',
      component: UsersList,
      name: 'usersList',
      meta: {
        requiresAuth: false,
        auth: true,
        title: '사용자관리'
      }
    },
    {
      path: 'detail',
      component: UsersDetail,
      name: 'usersDetail',
      meta: {
        requiresAuth: false,
        auth: true,
        title: '사용자관리 > 상세',
        possibleSameMenuMove: true
      }
    }
  ]
}
