<template>
  <div class="content-container">
    <div>
      <v-form lazy-validation>
        <v-row @keypress.enter="getNoticeList">
          <v-col cols="3">
            <v-text-field
              v-model="searchParam.searchTitle"
              append-icon="search"
              clearable
              label="제목"
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="searchParam.searchWriter"
              append-icon="search"
              clearable
              label="작성자"
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <date-picker
              v-model="searchParam.searchDate"
              label="작성일"
            ></date-picker>
          </v-col>
        </v-row>
      </v-form>
      <v-row justify="space-between">
        <v-col cols="4" align-self="center" class="pr-0">
          <div class="black--text">총 {{searchParam.total}} 건 {{searchParam.page}} / {{pages}} 페이지</div>
        </v-col>
        <v-col cols="7" align-self="center" class="text-right pl-0">
          <v-btn outlined rounded color="green" @click="clearSearchParam">
            <v-icon left>refresh</v-icon>
            초기화
          </v-btn>
          <v-btn class="ml-3" outlined rounded color="primary" @click="getNoticeList">
            <v-icon left>search</v-icon>
            검색
          </v-btn>
          <v-btn class="ml-3" outlined rounded color="teal darken-1" @click="writeNotice">
            <v-icon left>edit</v-icon>
            등록
          </v-btn>
        </v-col>
      </v-row>
    </div>

    <v-data-table
      :no-data-text="'검색 결과가 없습니다.'"
      :headers="headers"
      :items="noticeList"
      item-key="chgHisSeq"
      hide-default-footer
      disable-sort
      disable-hover
      class="bordered condensed click-row history-table"
    >
      <template v-slot:[`item.title`]="{ item }">
        <router-link :to="`/notice/modify/${item.noticeSeq}`">
          {{ item.title }}
        </router-link>
      </template>
      <template v-slot:[`item.createdDate`]="{ item }">
        {{ getDateFormat(item.createdDate) }}
      </template>
      <template v-slot:[`item.hitCount`]="{ item }">
        <v-chip
          class="ma-2"
          color="gray"
        >
          {{ item.hitCount }}
        </v-chip>
      </template>
      <template v-slot:[`item.deleteNotice`]="{ item }">
        <v-btn color="red" outlined dark @click="deleteNotice(item.noticeSeq)">
          <v-icon left>delete_outline</v-icon>
          삭제
        </v-btn>
      </template>
    </v-data-table>

    <v-pagination
      :value="searchParam.page"
      :total-visible="10"
      :length="pages"
      circle
      class="mt-3"
      @input="pageChange($event)"
    ></v-pagination>
  </div>
</template>

<script>
import noticeService from 'Api/notice/notice.service'
import dayjs from 'dayjs'
import DatePicker from 'Components/date/DatePicker'

export default {
  name: 'NoticeList',
  components: {
    DatePicker
  },
  computed: {
    pages () {
      if (this.searchParam.size == null || this.searchParam.total == null || this.searchParam.total === 0) {
        return 1
      }
      return Math.ceil(this.searchParam.total / this.searchParam.size)
    }
  },
  data: () => ({
    headers: [
      { text: '번호', value: 'NTC_ID', align: 'center' },
      { text: '제목', value: 'NTC_SJ', align: 'center' },
      { text: '작성자', value: 'writerName', align: 'center' },
      { text: '작성일', value: 'FSR_DTM', align: 'center' },
      { text: '삭제', value: 'deleteNotice', align: 'center' }
    ],
    noticeList: [],
    searchParam: {
      searchTitle: '',
      searchWriter: '',
      searchDate: '',
      page: 1,
      size: 10,
      total: 0
    }
  }),
  created () {
    this.getNoticeList()
  },
  methods: {
    deleteNotice (noticeSeq) {
      this.$dialog.confirm('삭제 하시겠습니까?').then(() => {
        noticeService.deleteNotice(noticeSeq).then(() => {
          this.$dialog.alert('삭제 되었습니다.')
          this.getNoticeList()
        })
      })
    },
    writeNotice () {
      this.$router.push({ path: '/notice/write' })
    },
    pageChange (pageNum) {
      if (this.searchParam.page !== pageNum) {
        this.searchParam.page = pageNum
        this.getNoticeList()
      }
    },
    clearSearchParam () {
      this.searchParam.searchTitle = ''
      this.searchParam.searchWriter = ''
      this.searchParam.searchDate = null
    },
    getNoticeList () {
      noticeService.getNoticeList(this.searchParam).then(response => {
        this.noticeList = response.data
        this.searchParam.total = response.pagination.total
      })
    },
    getDateFormat (date) {
      return dayjs(date, 'YYYYMMDDHHmmss').format('YYYY-MM-DD')
    }
  }
}
</script>
