// search pagination
import SearchPagination from 'Components/Search/SearchPagination'

import DatePicker from 'Components/date/DatePicker'

const GlobalComponents = {
  install (Vue) {
    Vue.component('searchPagination', SearchPagination)
    Vue.component('datePicker', DatePicker)
  }
}

export default GlobalComponents
