// 자주묻는 질문
const FaqView = () => import('Views/faq/FaqView')

// 자주묻는 질문 목록
const FaqList = () => import('Views/faq/FaqList')

// 자주묻는 질문 등록, 수정
const FaqWrite = () => import('Views/faq/FaqWrite')

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
    },
    {
      path: 'modify',
      component: FaqWrite,
      name: 'faqModify',
      meta: {
        requiresAuth: false,
        auth: true,
        title: '자주 묻는 질문 > 수정',
        possibleSameMenuMove: true
      }
    },
    {
      path: 'write',
      component: FaqWrite,
      name: 'faqWrite',
      meta: {
        requiresAuth: false,
        auth: true,
        title: '자주 묻는 질문 > 등록',
        possibleSameMenuMove: true
      }
    }
  ]
}
