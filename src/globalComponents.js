// search pagination
import SearchPagination from 'Components/board/SearchPagination'

const GlobalComponents = {
  install (Vue) {
    Vue.component('searchPagination', SearchPagination)
    Vue.component('searchForm')
  }
}

export default GlobalComponents
