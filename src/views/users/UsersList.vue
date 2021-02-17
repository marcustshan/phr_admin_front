<template>
  <div class="content-container">
      <v-form lazy-validation>
        <v-row @keypress.enter="getUsersList" dense>
          <v-col cols="3">
            <v-text-field
              v-model="searchParam.q.id"
              append-icon="search"
              clearable
              label="아이디"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="searchParam.q.name"
              append-icon="search"
              clearable
              label="이름"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="searchParam.q.sex"
              append-icon="search"
              clearable
              label="성별"
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
        <v-col cols="4" align-self="center">
          <div class="black--text">총 {{searchParam.total}} 건 {{searchParam.page}} / {{pages}} 페이지</div>
        </v-col>
        <v-col cols="7" align-self="center" class="text-right">
          <v-btn small outlined rounded color="green" @click="clearSearchParam">
            <v-icon left>refresh</v-icon>
            초기화
          </v-btn>
          <v-btn small class="ml-3" outlined rounded color="primary" @click="getUsersList">
            <v-icon left>search</v-icon>
            검색
          </v-btn>
        </v-col>
      </v-row>

    <v-data-table
      :no-data-text="'검색 결과가 없습니다.'"
      :headers="headers"
      :items="usersList"
      item-key="USR_ID"
      hide-default-footer
      disable-hover
      class="bordered condensed click-row history-table"
    >
      <template v-slot:item.ROW_NUM ="{item}">
        {{item.ROW_NUM}}
      </template>
      <template v-slot:item.USR_GND_CD = {item}>
        {{item.USR_GND_CD === 'M' ? '남' : '여'}}
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
                <thead class="detailTable">
                <tr>
                  <th class="text-center">사용자</th>
                  <td>{{ dialogForm.USR_NM }}({{ dialogForm.USR_ID }})</td>
                </tr>
                </thead>
              </v-simple-table>
            </v-col>
          </v-row>
          <v-row>
            <v-col sm="12">
              <v-simple-table>
                <thead class="detailTable">
                <tr>
                  <th class="text-center">동의기관</th>
                  <th class="text-center">기관동의일시</th>
                  <th class="text-center">기관동의여부</th>
                  <th class="text-center">연계항목</th>
                  <th class="text-center">항목동의일시</th>
                  <th class="text-center">항목동의여부</th>
                </tr>
                <tr>
                    <th class="text-center">건강보험심사 평가원</th>
                    <td class="text-center">{{ dialogForm.HIRA_AGR_DT }}</td>
                    <td class="text-center">{{ dialogForm.HIRA_AGR_YN === 'Y' ? '동의' : '미동의'}}</td>
                    <th class="text-center">투약이력</th>
                    <td class="text-center"></td>
                    <td class="text-center"></td>
                </tr>
                <tr>
                    <th rowspan="2" class="text-center">건강보험공단</th>
                    <td rowspan="2" class="text-center">{{ dialogForm.NHIS_AGR_DT}}</td>
                    <td rowspan="2" class="text-center">{{ dialogForm.NHIS_AGR_YN === 'Y' ? '동의' : '미동의'}}</td>
                    <th class="text-center">진료이력</th>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                  <th class="text-center">건강검진</th>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th class="text-center">질병관리청</th>
                  <td class="text-center">{{ dialogForm.KDCA_AGR_DT }}</td>
                  <td class="text-center">{{ dialogForm.KDCA_AGR_YN === 'Y' ? '동의' : '미동의'}}</td>
                  <th class="text-center">예방접종</th>
                  <td></td>
                  <td></td>
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
  USR_ID: null,
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
      return Math.ceil(this.searchParam.total / this.searchParam.size)
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
    dialog: false,
    dialogForm: _.cloneDeep(DIALOG_FORM),
    usersList: [],
    searchParam: {
      q: {
        id: null,
        name: null,
        sex: null,
        birth: null
      },
      sysId: null,
      page: 1,
      size: 10,
      total: 0
    }
  }),
  created () {
  },
  mounted () {
    if (this.user.ADM_SYS_ID) {
      this.searchParam.sysId = this.user.ADM_SYS_ID
    }
    this.getUsersList()
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
    // 접속일시 팝업
    goDetailPage (item) {
      this.$router.push({ path: '/users/detail', name: 'usersDetail', params: { item: item } })
    },
    // 동의 기관 팝업
    openDialog (item) {
      this.dialogForm = {}
      this.dialogForm = _.cloneDeep(item)
      this.dialog = !this.dialog
    },
    // 사용자 목록 조회
    getUsersList () {
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
