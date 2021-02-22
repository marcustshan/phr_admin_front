<template>
  <div class="content-container">
    <v-row>
      <v-col sm="12">
        <v-simple-table dense>
          <thead class="detailTable">
          <tr>
            <th class="text-center">사용자</th>
            <td colspan="3">{{ userInfo.USR_ID }}({{ userInfo.USR_NM }})</td>
          </tr>
          <tr>
            <th class="text-center">성별</th>
            <td>{{ userInfo.USR_GND_CD === 'M' ? '남자' : '여자' }}</td>
            <th class="text-center">생년월일</th>
            <td>{{ userInfo.USR_DOB_DT }}</td>
          </tr>
          <tr>
            <th class="text-center">가입일시</th>
            <td>{{ userInfo.JOIN_DTM }}</td>
            <th class="text-center">접속일시</th>
            <td>{{ userInfo.LSH_LGN_DTM }}</td>
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
        <v-col cols="1" class="ml-auto">
          <v-select
            v-model="searchParam.type"
            :items="searchList"
            item-text="commCdNm"
            item-value="commCd"
            hide-details
          ></v-select>
        </v-col>
        <v-col cols="2" class="ml-3">
          <date-picker
            v-model='searchParam.startDt'
            format="YYYY-MM-DD"
            label="시작일"
            hide-details
          >
          </date-picker>
        </v-col>
        <v-col cols="3" class="ml-3">
          <date-picker
            v-model="searchParam.endDt"
            :min="searchParam.startDt"
            :btnYn="true"
            :clickFn="getUsersDetailList"
            @refreshFn="clearSearchParam(searchParam)"
            format="YYYY-MM-DD"
            hide-details
            label="종료일"
          ></date-picker>
        </v-col>
<!--        <v-col cols="1" align-self="end" class="text-right">
          <v-btn small outlined class="black&#45;&#45;text" @click="getUsersDetailList">
            <v-icon>search</v-icon>
          </v-btn>
          <v-btn small outlined class="black&#45;&#45;text ml-1" color="#43425d" @click="clearSearchParam(searchParam)">
            <v-icon>refresh</v-icon>
          </v-btn>
        </v-col>-->
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
      <template v-slot:item.EXC_TP = {item}>
        {{ item.EXC_TP }} ({{ item.DTL_CD_NM }})
      </template>
      <template v-slot:item.DWN_DT = {item}>
        {{ date(item.DWN_DT) }}
      </template>
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
import dayjs from 'dayjs'

export default {
  name: 'UsersDetail',
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
      type: 'ALL',
      startDt: null,
      endDt: null,
      sysId: null,
      userId: null,
      page: 1,
      size: 10,
      total: 0
    },
    searchList: [{ commCdNm: '전체', commCd: 'ALL' }, { commCdNm: '파일공유', commCd: 'S' }, { commCdNm: '다운로드', commCd: 'N' }, { commCdNm: '파일통합', commCd: 'Y' }],
    headers: [
      { text: 'No', value: 'ROW_NUM', align: 'center', width: '8%' },
      { text: '수행내역', value: 'EXC_TP', align: 'center' },
      { text: '수행일시', value: 'DWN_DT', align: 'center' }
    ],
    searchInd: '1',
    startDt: null,
    endDt: null,
    detailList: [],
    userInfo: {}
  }),
  mounted () {
    if (this.$route.params.item) {
      this.userInfo = this.$route.params.item
      if (this.userInfo.USR_SYS_ID && this.user.ADM_SYS_ID) {
        this.searchParam.sysId = this.user.ADM_SYS_ID
        this.searchParam.userId = this.userInfo.USR_SYS_ID
      }
      this.getUsersDetailList()
    } else {
      this.$router.push({ path: '/users/list' })
    }
  },
  methods: {
    // 날짜 format
    date (value, format = 'YYYY-MM-DD HH:mm:ss') {
      if (!value) {
        return ''
      } else if (!dayjs(value).isValid()) {
        return '날짜 형식이 맞지 않습니다.'
      }
      return dayjs(value).format(format)
    },
    // 사용자 관리 상세 목록 조회
    getUsersDetailList () {
      if (this.checkValidate()) {
        usersService.getUsersDetailList(this.searchParam).then(response => {
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
        this.getUsersDetailList()
      }
    }
  }
}
</script>
