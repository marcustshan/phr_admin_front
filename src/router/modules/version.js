// 버전 관리
const VersionView = () => import('Views/version/VersionView')

// 버전관리 목록
const VersionList = () => import('Views/version/VersionList')

// 버전관리 등록,수정
const VersionWrite = () => import('Views/version/VersionWrite')

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
        title: '버전관리'
      }
    },
    {
      path: 'modify/:versionSeq',
      component: VersionWrite,
      name: 'versionModify',
      meta: {
        requiresAuth: false,
        auth: true,
        title: '버전관리 > 수정',
        possibleSameMenuMove: true
      }
    },
    {
      path: 'write',
      component: VersionWrite,
      name: 'versionWrite',
      meta: {
        requiresAuth: false,
        auth: true,
        title: '버전관리 > 등록',
        possibleSameMenuMove: true
      }
    }
  ]
}
