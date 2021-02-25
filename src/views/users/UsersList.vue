<template>
  <div class="content-container">
    <div>
        <v-form ref="form" lazy-validation autocomplete="off">
        <v-row dense>
          <v-col cols="1" class="ml-auto">
            <!--suppress XmlInvalidId -->
            <label for="searchInd" class="no-display">검색조건</label>
            <v-select
              id="searchInd"
              v-model="searchParam.type"
              :items="searchInd"
              hide-details
              item-text="codeNm"
              item-value="code"
            ></v-select>
          </v-col>
          <v-col cols="3" class="ml-2">
            <v-text-field
              v-model="searchParam.search"
              @keypress.enter="getUsersList"
              clearable
              autocomplete="off"
              hide-details
              label="검색"
            >
              <template v-slot:append-outer>
                <v-btn small outlined class="black--text" @click="getUsersList">
                  <v-icon>search</v-icon>
                </v-btn>
                <v-btn small outlined class="black--text ml-2" color="#43425d" @click="clearSearchParam(searchParam)">
                  <v-icon>refresh</v-icon>
                </v-btn>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
      </v-form>
      <v-row justify="space-between">
        <v-col cols="4" align-self="center">
          <div class="black--text">총 {{searchParam.total}} 건 {{searchParam.page}} / {{pages}} 페이지</div>
        </v-col>
      </v-row>
    </div>

    <v-data-table
      :no-data-text="'검색 결과가 없습니다.'"
      :headers="headers"
      :items="usersList"
      item-key="ROW_NUM"
      hide-default-footer
      disable-hover
      class="bordered condensed click-row history-table"
      caption="사용자관리 목록"
    >
      <template v-slot:item.ROW_NUM ="{item}">
        {{item.ROW_NUM}}
      </template>
      <template v-slot:item.USR_GND_CD = {item}>
        {{item.USR_GND_CD === 'M' ? '남자' : '여자'}}
      </template>
      <template v-slot:item.LSH_LGN_DTM = {item}>
        <span @click="goDetailPage(item)" class="blue--text pointer text-decoration-underline">
          {{item.LSH_LGN_DTM}}
        </span>
      </template>
      <template v-slot:item.AGREE_YN = {item}>
          <span class="blue--text pointer text-decoration-underline" @click="openDialog(item)">보기</span>
      </template>
    </v-data-table>

    <!-- 사용자 동의기관 Dialog -->
    <v-dialog v-model="dialog" width="1000">
      <v-card>
        <v-card-title class="headline justify-center primary white--text">
          사용자 동의내역
        </v-card-title>
        <v-card-text class="pt-4">
          <v-row class="justify-end" dense no-gutters>
            <v-col cols="4">
              <v-simple-table>
                <caption>사용자 정보</caption>
                <thead class="detailTable">
                <tr>
                  <th class="text-center" scope="col">사용자</th>
                  <td>{{ dialogForm.USR_NM }}({{ USR_ID }})</td>
                </tr>
                </thead>
              </v-simple-table>
            </v-col>
          </v-row>
          <v-row>
            <v-col sm="12">
              <v-simple-table>
                <caption>사용자 동의내역</caption>
                <thead class="detailTable">
                <tr>
                  <th class="text-center" scope="col">동의기관</th>
                  <th class="text-center" scope="col">기관동의일시</th>
                  <th class="text-center" scope="col">기관동의여부</th>
                  <th class="text-center" scope="col">연계항목</th>
                  <th class="text-center" scope="col">항목동의일시</th>
                  <th class="text-center" scope="col">항목동의여부</th>
                </tr>
                <tr>
                    <th class="text-center" scope="col">건강보험심사 평가원</th>
                    <td class="text-center">{{ isEmpty(dialogForm.HIRA_AGR_DT) ? '-' : dialogForm.HIRA_AGR_DT }}</td>
                    <td class="text-center">{{ dialogForm.HIRA_AGR_YN === 'Y' ? '동의' : '미동의' }}</td>
                    <th class="text-center" scope="col">투약이력</th>
                    <td class="text-center">{{ isEmpty(dialogForm.MEDIC_AGR_DT) ? '-' : dialogForm.MEDIC_AGR_DT }}</td>
                    <td class="text-center">{{ dialogForm.MEDIC_AGR_YN === 'Y' ? '동의' : '미동의' }}</td>
                </tr>
                <tr>
                    <th rowspan="2" class="text-center" scope="col">건강보험공단</th>
                    <td rowspan="2" class="text-center" scope="col">{{ isEmpty(dialogForm.NHIS_AGR_DT) ? '-' : dialogForm.NHIS_AGR_DT }}</td>
                    <td rowspan="2" class="text-center" scope="col">{{ dialogForm.NHIS_AGR_YN === 'Y' ? '동의' : '미동의' }}</td>
                    <th class="text-center" scope="col">진료이력</th>
                    <td class="text-center">{{ isEmpty(dialogForm.TREAT_AGR_DT) ? '-' : dialogForm.TREAT_AGR_DT }}</td>
                    <td class="text-center">{{ dialogForm.TREAT_AGR_YN === 'Y' ? '동의' : '미동의' }}</td>
                </tr>
                <tr>
                  <th class="text-center" scope="col">건강검진</th>
                  <td class="text-center">{{ isEmpty(dialogForm.HEALT_AGR_DT) ? '-' : dialogForm.HEALT_AGR_DT }}</td>
                  <td class="text-center">{{ dialogForm.HEALT_AGR_YN === 'Y' ? '동의' : '미동의' }}</td>
                </tr>
                <tr>
                  <th class="text-center" scope="col">질병관리청</th>
                  <td class="text-center">{{ isEmpty(dialogForm.KDCA_AGR_DT) ? '-' : dialogForm.KDCA_AGR_DT }}</td>
                  <td class="text-center">{{ dialogForm.KDCA_AGR_YN === 'Y' ? '동의' : '미동의' }}</td>
                  <th class="text-center" scope="col">예방접종</th>
                  <td class="text-center">{{ isEmpty(dialogForm.VACCI_AGR_DT) ? '-' : dialogForm.VACCI_AGR_DT }}</td>
                  <td class="text-center">{{ dialogForm.VACCI_AGR_YN === 'Y' ? '동의' : '미동의' }}</td>
                </tr>
                </thead>
              </v-simple-table>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="justify-center">
          <v-btn @click="dialog = false" color="primary">
            확인
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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

const DIALOG_FORM = {
  USR_NM: null,
  HIRA_AGR_DT: null,
  HIRA_AGR_YN: null,
  NHIS_AGR_DT: null,
  NHIS_AGR_YN: null,
  KDCA_AGR_DT: null,
  KDCA_AGR_YN: null
}

export default {
  name: 'UsersList',
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
    headers: [
      { text: 'No', value: 'ROW_NUM', align: 'center', sortable: false },
      { text: '아이디', value: 'USR_ID', align: 'center' },
      { text: '이름', value: 'USR_NM', align: 'center' },
      { text: '성별', value: 'USR_GND_CD', align: 'center' },
      { text: '생년월일', value: 'USR_DOB_DT', align: 'center' },
      { text: '가입일시', value: 'JOIN_DTM', align: 'center' },
      { text: '접속일시', value: 'LSH_LGN_DTM', align: 'center' },
      { text: '동의내역', value: 'AGREE_YN', align: 'center' }
    ],
    USR_ID: null,
    dialog: false,
    dialogForm: _.cloneDeep(DIALOG_FORM),
    usersList: [],
    searchInd: [{ code: 'ALL', codeNm: '전체', label: '전체' }, { code: 'USR_ID', codeNm: '아이디' }],
    searchParam: {
      type: 'ALL',
      search: null,
      sysId: null,
      page: 1,
      size: 10,
      total: 0
    }
  }),
  created () {
  },
  mounted () {
    // 관리자 ID
    if (this.user.ADM_SYS_ID) {
      this.searchParam.sysId = this.user.ADM_SYS_ID
    }
    // 검색조건 유지
    if (this.$route.params.item) {
      this.searchParam.page = this.$route.params.item.page
      this.searchParam.type = this.$route.params.item.type
      this.searchParam.search = this.$route.params.item.search
    }
    // 목록 조회
    this.getUsersList()
  },
  methods: {
    pageChange (pageNum) {
      if (this.searchParam.page !== pageNum) {
        this.searchParam.page = pageNum
        this.getUsersList()
      }
    },
    // 접속일시 팝업
    goDetailPage (item) {
      item.q = {
        page: this.searchParam.page,
        type: this.searchParam.type,
        search: this.searchParam.search
      }
      this.$router.push({ path: '/users/detail', name: 'usersDetail', params: { item: item } })
    },
    // 동의 기관 팝업
    openDialog (item) {
      item.ADM_SYS_ID = this.user.ADM_SYS_ID
      usersService.getUserDetail(item).then(res => {
        if (res.data) {
          this.dialogForm = _.cloneDeep(res.data[0])
        }
      })
      this.USR_ID = item.USR_ID
      this.dialog = !this.dialog
    },
    // 사용자 목록 조회
    getUsersList () {
      if (!this.isEmpty(this.searchParam.search)) {
        this.searchParam.page = 1
      }
      usersService.getUsersList(this.searchParam).then(response => {
        if (response.data) {
          if (typeof response.data === 'object' && Object.keys(response.data).length < 1) {
            response.data = []
          }
          this.usersList = response.data
          this.searchParam.total = response.headers['paging-total-count']
        }
      })
    }
  }
}
</script>
