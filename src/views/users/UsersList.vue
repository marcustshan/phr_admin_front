<template>
  <div class="content-container">
    <div>
      <v-form lazy-validation>
        <v-row @keypress.enter="getUsersList">
          <v-col cols="3">
            <v-text-field
              v-model="searchParam.q.id"
              append-icon="search"
              clearable
              label="아이디"
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="searchParam.q.name"
              append-icon="search"
              clearable
              label="이름"
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="searchParam.q.sex"
              append-icon="search"
              clearable
              label="성별"
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <date-picker
              v-model="searchParam.q.birth"
              label="생년월일"
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
          <v-btn class="ml-3" outlined rounded color="primary" @click="getUsersList">
            <v-icon left>search</v-icon>
            검색
          </v-btn>
        </v-col>
      </v-row>
    </div>

    <v-data-table
      :no-data-text="'검색 결과가 없습니다.'"
      :headers="headers"
      :items="usersList"
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
      { text: '아이디', value: 'NTC_ID', align: 'center' },
      { text: '이름', value: 'NTC_SJ', align: 'center' },
      { text: '성별', value: 'writerName', align: 'center' },
      { text: '생년월일', value: 'FSR_DTM', align: 'center' },
      { text: '가입일시', value: 'deleteNotice', align: 'center' },
      { text: '접속일시', value: 'deleteNotice', align: 'center' },
      { text: '건강보험 심사평가원', value: 'deleteNotice', align: 'center' },
      { text: '건강보험 공단', value: 'deleteNotice', align: 'center' },
      { text: '질병관리형', value: 'deleteNotice', align: 'center' }
    ],
    usersList: [],
    searchParam: {
      q: {
        id: null,
        name: null,
        sex: null,
        birth: null
      },
      page: 1,
      size: 10,
      total: 0
    }
  }),
  created () {
  },
  methods: {
    pageChange (pageNum) {
      if (this.searchParam.page !== pageNum) {
        this.searchParam.page = pageNum
        this.getUsersList()
      }
    },
    clearSearchParam () {
      this.searchParam.q = {}
    },
    getUsersList () {
      console.log(this.searchParam.q)
    }
  }
}
</script>
