// 버전 관리
const VersionView = () => import('Views/version/VersionView')

// 버전관리 목록
const VersionList = () => import('Views/version/VersionList')

export default {
  path: '/version',
  name: 'version',
  redirect: '/version/list',
  component: VersionView,
  meta: {
    title: '버전 관리',
    breadcrumb: '버전 관리'
  },
  children: [
    {
      path: 'list',
      component: VersionList,
      name: 'versionList',
      meta: {
        requiresAuth: false,
        auth: true,
        title: '버전 관리'
      }
    }
  ]
}
