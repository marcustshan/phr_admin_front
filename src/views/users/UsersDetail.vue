<template>
  <div class="content-container">
    <v-row>
      <v-col sm="12">
        <v-simple-table dense>
          <thead class="detailTable">
          <tr>
            <th class="text-center">사용자</th>
            <td colspan="3">{{ this.userInfo.USR_ID }}({{ this.userInfo.USR_NM }})</td>
          </tr>
          <tr>
            <th class="text-center">성별</th>
            <td>{{ this.userInfo.USR_GND_CD === 'M' ? '남자' : '여자' }}</td>
            <th class="text-center">생년월일</th>
            <td>{{ this.userInfo.USR_DOB_DT }}</td>
          </tr>
          <tr>
            <th class="text-center">가입일시</th>
            <td>{{ this.userInfo.JOIN_DTM }}</td>
            <th class="text-center">접속일시</th>
            <td>{{ this.userInfo.LSH_LGN_DTM }}</td>
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
      <v-row @keypress.enter="getUsersDetailList">
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
          <v-btn class="ml-3" outlined rounded color="primary" @click="getUsersDetailList">
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
        <router-link to="/users/list">
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
import usersService from 'Api/users/users.service'

export default {
  name: 'UsersDetail',
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
      { text: '수행내역', value: 'content', align: 'center' },
      { text: '수행일시', value: 'date', align: 'center' }
    ],
    searchInd: '1',
    startDt: null,
    endDt: null,
    detailList: [],
    searchList: [{ commCdNm: '전체', commCd: '1' }, { commCdNm: '건강검진 이력 다운로드', commCd: '2' }],
    userInfo: {}
  }),
  mounted () {
    if (this.$route.params.item) {
      this.userInfo = this.$route.params.item
      this.getUsersDetailList()
    } else {
      this.$router.push({ path: '/users/list' })
    }
  },
  methods: {
    // 사용자 관리 상세 목록 조회
    getUsersDetailList () {
      usersService.getUsersDetailList(this.searchParam).then(response => {
        if (response.data) {
          if (typeof response.data === 'object' && Object.keys(response.data).length < 1) {
            response.data = []
          }
          this.detailList = response.data
          this.searchParam.total = response.pagination.total
        }
        // 임시
        const tempList = [
          { no: '3', content: '파일공유 (투약이력, 진료이력, 건강검진)', date: '2020-10-20 17:22:00' },
          { no: '2', content: '파일공유 (진료이력)', date: '2020-10-20 17:22:00' },
          { no: '1', content: '다운로드 (건강검진)', date: '2020-10-20 17:22:00' }
        ]
        this.detailList = tempList
      })
    },
    pageChange (pageNum) {
      if (this.searchParam.page !== pageNum) {
        this.searchParam.page = pageNum
        this.getUsersDetailList()
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
