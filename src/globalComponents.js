// search pagination
import SearchPagination from 'Components/board/SearchPagination'

import DatePicker from 'Components/date/DatePicker'

const GlobalComponents = {
  install (Vue) {
    Vue.component('searchPagination', SearchPagination)
    Vue.component('datePicker', DatePicker)
    Vue.component('searchForm')
  }
}

export default GlobalComponents
