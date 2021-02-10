<template>
  <div class="content-container">
    <v-row>
      <v-col sm="12">
        <v-simple-table dense>
          <thead class="detailTable">
          <tr>
            <th class="text-center">관리자</th>
            <td colspan="5">{{ this.managerInfo.ADM_ID }}({{ this.managerInfo.ADM_NM }})</td>
          </tr>
          <tr>
            <th class="text-center">최근로그인</th>
            <td>최근로그인 날짜~</td>
            <th class="text-center">최근 로그아웃</th>
            <td>최근로그아웃 날짜~</td>
            <th class="text-center">IP</th>
            <td>127.0.0.1</td>
          </tr>
          </thead>
        </v-simple-table>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="4" cols="2">
        <v-icon left color="#43425d">label</v-icon>
        <v-label>상세내역 조회</v-label>
      </v-col>
    </v-row>

    <div>
      <v-row @keypress.enter="getManagerDetailList">
        <v-col cols="3">
          <v-select
            v-model="searchParam.searchInd"
            :items="searchList"
            item-text="commCdNm"
            item-value="commCd"
          ></v-select>
        </v-col>
        <v-col cols="3">
          <date-picker
            v-model='searchParam.searchStartDt'
            format="YYYY-MM-DD"
            label="시작일"
          >
          </date-picker>
        </v-col>
        <v-col cols="3">
          <date-picker
            v-model="searchParam.searchEndDt"
            :min="searchParam.searchStartDt"
            format="YYYY-MM-DD"
            label="종료일"
          ></date-picker>
        </v-col>
        <v-col cols="3" align-self="center" class="text-right pl-0">
          <v-btn outlined rounded color="green" @click="clearSearchParam">
            <v-icon left>refresh</v-icon>
            초기화
          </v-btn>
          <v-btn class="ml-3" outlined rounded color="primary" @click="getManagerDetailList">
            <v-icon left>search</v-icon>
            검색
          </v-btn>
        </v-col>
      </v-row>
    </div>

    <v-data-table
      :no-data-text="'검색 결과가 없습니다.'"
      :headers="headers"
      :items="detailList"
      item-key="no"
      hide-default-footer
      disable-sort
      disable-hover
      class="bordered condensed click-row history-table"
    >
    </v-data-table>

    <v-row>
      <v-col cols="12" class="text-right">
        <router-link to="/manager/list">
          <v-btn outlined color="brown lighten-2">목록</v-btn>
        </router-link>
      </v-col>
    </v-row>

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
import managerService from 'Api/manager/manager.service'

export default {
  name: 'ManagerDetail',
  computed: {
    pages () {
      if (this.searchParam.size == null || this.searchParam.total == null || this.searchParam.total === 0) {
        return 1
      }
      return Math.ceil(this.searchParam.total / this.searchParam.size)
    }
  },
  data: () => ({
    searchParam: {
      searchInd: '1',
      searchStartDt: null,
      searchEndDt: null,
      page: 1,
      size: 10,
      total: 0
    },
    headers: [
      { text: 'No', value: 'no', align: 'center', width: '8%' },
      { text: '수행내역', value: 'SQL_NM', align: 'center' },
      { text: '수행일시', value: 'LOG_DTM', align: 'center' }
    ],
    searchInd: '1',
    startDt: null,
    endDt: null,
    detailList: [],
    searchList: [{ commCdNm: '전체', commCd: '1' }, { commCdNm: '건강검진 이력 다운로드', commCd: '2' }],
    managerInfo: {}
  }),
  mounted () {
    if (this.$route.params.item) {
      this.managerInfo = this.$route.params.item
      this.getManagerDetailList()
    } else {
      this.$router.push({ path: '/manager/list' })
    }
  },
  methods: {
    // 사용자 관리 상세 목록 조회
    getManagerDetailList () {
      managerService.getManagerDetailList(this.searchParam).then(response => {
        if (response.data) {
          if (typeof response.data === 'object' && Object.keys(response.data).length < 1) {
            response.data = []
          }
          this.detailList = response.data
          // TODO
          this.searchParam.total = this.detailList.length
          // this.searchParam.total = response.pagination.total
        }
      })
    },
    pageChange (pageNum) {
      if (this.searchParam.page !== pageNum) {
        this.searchParam.page = pageNum
        this.getManagerDetailList()
      }
    },
    // 초기화
    clearSearchParam () {
      this.searchParam.searchInd = '1'
      this.searchParam.searchStartDt = null
      this.searchParam.searchEndDt = null
    }
  }
}
</script>
