// 대시보드
const DashboardView = () => import('Views/dashboard/Dashboard')

export default {
  path: '/dashboard',
  name: 'dashboard',
  component: DashboardView,
  meta: {
    title: '대시보드',
    subTitle: '실시간 조회입니다.',
    breadcrumb: '대시보드'
  }
}
