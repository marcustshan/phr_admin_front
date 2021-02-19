<template>
  <div class="content-container">
    <v-row>
      <v-col sm="12">
        <v-simple-table dense>
          <thead class="detailTable">
          <tr>
            <th class="text-center">관리자</th>
            <td colspan="5">{{ managerInfo.ADM_ID }}({{ managerInfo.ADM_NM }})</td>
          </tr>
          <tr>
            <th class="text-center">최근로그인</th>
            <td>{{ managerInfo.LAST_LOGIN_DT }}</td>
            <th class="text-center">최근 로그아웃</th>
            <td>{{ managerInfo.LAST_LOGOUT_DT }}</td>
            <th class="text-center">IP</th>
            <td>{{ managerInfo.LAST_CONECT_IP }}</td>
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

    <v-form ref="form" lazy-validation autocomplete="off">
      <v-row dense>
        <v-col cols="2" class="ml-auto">
          <v-text-field
            v-model="searchParam.search"
            @keypress.enter="getManagerDetailList"
            label="수행내역"
            clearable
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="2" class="ml-5">
          <date-picker
            v-model='searchParam.startDt'
            format="YYYY-MM-DD"
            label="시작일"
            hide-details
            aria-autocomplete="none"
          >
          </date-picker>
        </v-col>
        <v-col cols="2" class="ml-5">
          <date-picker
            v-model="searchParam.endDt"
            :min="searchParam.startDt"
            format="YYYY-MM-DD"
            hide-details
            label="종료일"
            aria-autocomplete="none"
          ></date-picker>
        </v-col>
        <v-col cols="1" align-self="end" class="text-right">
          <v-btn small outlined class="black--text" @click="getManagerDetailList">
            <v-icon>search</v-icon>
          </v-btn>
          <v-btn small outlined class="black--text ml-1" color="#43425d" @click="clearSearchParam(searchParam)">
            <v-icon>refresh</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row justify="space-between">
        <v-col cols="4" align-self="center">
          <div class="black--text">총 {{searchParam.total}} 건 {{searchParam.page}} / {{pages}} 페이지</div>
        </v-col>
      </v-row>
    </v-form>

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
      return Number(this.searchParam.total) !== 0 ? Math.ceil(this.searchParam.total / this.searchParam.size) : 1
    },
    user () {
      return this.$store.state.user.userInfo
    }
  },
  data: () => ({
    searchParam: {
      search: null,
      startDt: null,
      endDt: null,
      IN_ADM_SYS_ID: null,
      IN_MNGR_SYS_NO: null,
      page: 1,
      size: 10,
      total: 0
    },
    headers: [
      { text: 'No', value: 'ROW_NUM', align: 'center', width: '8%' },
      { text: '수행내역', value: 'LOG_FACTR_CN', align: 'center' },
      { text: '수행일시', value: 'LOG_DTM', align: 'center' }
    ],
    detailList: [],
    managerInfo: {}
  }),
  mounted () {
    if (this.$route.params.item) {
      const sysID = this.$route.params.item.ADM_SYS_ID
      const mSysID = this.user.ADM_SYS_ID
      this.searchParam.IN_ADM_SYS_ID = sysID
      this.searchParam.IN_MNGR_SYS_NO = mSysID
      this.getManagerDetail()
    } else {
      this.$router.push({ path: '/manager/list' })
    }
  },
  methods: {
    // 상세 조회
    getManagerDetail () {
      managerService.getManagerDetail(this.searchParam).then(res => {
        if (res.data) {
          this.managerInfo = res.data[0]
        }
        // 관리자 수행내역 목록 조회
        this.getManagerDetailList()
      })
    },
    // 관리자 수행내역 목록 조회
    getManagerDetailList () {
      if (this.checkValidate()) {
        managerService.getManagerDetailList(this.searchParam).then(response => {
          if (response.data) {
            if (typeof response.data === 'object' && Object.keys(response.data).length < 1) {
              response.data = []
            }
            this.detailList = response.data
            this.searchParam.total = response.headers['paging-total-count']
          }
        })
      }
    },
    // 날짜 입력 유효성 검사
    checkValidate () {
      if (!this.isEmpty(this.searchParam.startDt) && this.isEmpty(this.searchParam.endDt)) {
        this.$dialog.alert('종료일을 입력해주세요.')
        return false
      }
      if (this.isEmpty(this.searchParam.startDt) && !this.isEmpty(this.searchParam.endDt)) {
        this.$dialog.alert('시작일을 입력해주세요.')
        return false
      }
      return true
    },
    pageChange (pageNum) {
      if (this.searchParam.page !== pageNum) {
        this.searchParam.page = pageNum
        this.getManagerDetailList()
      }
    }
  }
}
</script>
