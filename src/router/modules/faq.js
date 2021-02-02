// 자주묻는 질문
const FaqView = () => import('Views/faq/FaqView')

// 자주묻는 질문 목록
const FaqList = () => import('Views/faq/FaqList')

export default {
  path: '/faq',
  name: 'faq',
  redirect: '/faq/list',
  component: FaqView,
  meta: {
    title: '자주 묻는 질문',
    breadcrumb: '자주 묻는 질문'
  },
  children: [
    {
      path: 'list',
      component: FaqList,
      name: 'faqList',
      meta: {
        requiresAuth: false,
        auth: true,
        title: '자주 묻는 질문'
      }
    }
  ]
}
