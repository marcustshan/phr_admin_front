<template>
  <div class="content-container">
    <div>
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
    </div>

    <v-data-table
      :no-data-text="'검색 결과가 없습니다.'"
      :headers="headers"
      :items="usersList"
      item-key="USR_ID"
      hide-default-footer
      disable-hover
      class="bordered condensed click-row history-table"
    >
      <template v-slot:item.no="{ index }">
        {{index}}
      </template>
      <template v-slot:item.USR_GND_CD = {item}>
        {{item.USR_GND_CD === 'M' ? '남' : '여'}}
      </template>
      <template v-slot:item.LSH_LGN_DTM = {item}>
        <span @click="goDetailPage(item)" class="blue--text pointer text-decoration-underline">
          {{item.LSH_LGN_DTM}}
        </span>
      </template>
      <template v-slot:item.HIRA_AGR_YN = {item}>
        <span @click="item.HIRA_AGR_YN === 'Y' ? openDialog('HIRA_AGR', item) : ''" :class="item.HIRA_AGR_YN === 'Y' ? 'blue--text pointer text-decoration-underline' : ''">
          {{item.HIRA_AGR_YN === 'Y' ? '동의' : '미동의'}}
        </span>
      </template>
      <template v-slot:item.NHIS_AGR_YN = {item}>
          <span @click="item.NHIS_AGR_YN === 'Y' ? openDialog('NHIS_AGR', item) : ''" :class="item.NHIS_AGR_YN === 'Y' ? 'blue--text pointer text-decoration-underline' : ''">
          {{item.NHIS_AGR_YN === 'Y' ? '동의' : '미동의'}}
        </span>
      </template>
      <template v-slot:item.KDCA_AGR_YN = {item}>
        <span @click="item.KDCA_AGR_YN === 'Y' ? openDialog('KDCA_AGR', item) : ''" :class="item.KDCA_AGR_YN === 'Y' ? 'blue--text pointer text-decoration-underline' : ''">
          {{item.KDCA_AGR_YN === 'Y' ? '동의' : '미동의'}}
        </span>
      </template>
    </v-data-table>

    <!-- 사용자 동의기관 Dialog -->
    <v-dialog
      v-model="dialog"
      width="600"
    >
      <v-card>
        <v-card-title class="headline grey lighten-2 justify-center">
          사용자 동의기관
        </v-card-title>
        <v-card-text class="pt-4">
          <v-row>
            <v-col sm="12">
              <v-simple-table dense>
                <thead class="detailTable">
                  <tr>
                    <th class="text-center">사용자</th>
                    <td>{{ dialogForm.name }}({{ dialogForm.id }})</td>
                    <th class="text-center">동의기관</th>
                    <td>{{ dialogForm.organ }}</td>
                  </tr>
                  <tr style="height: 50px">
                    <th class="text-center">동의일시</th>
                    <td colspan="3">{{ dialogForm.agreeDt }}</td>
                  </tr>
                  <tr style="height: 150px">
                    <th class="text-center">연계항목</th>
                    <td colspan="3">{{ dialogForm.list }}</td>
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
      { text: 'No', value: 'no', align: 'center', sortable: false },
      { text: '아이디', value: 'USR_ID', align: 'center' },
      { text: '이름', value: 'USR_NM', align: 'center' },
      { text: '성별', value: 'USR_GND_CD', align: 'center' },
      { text: '생년월일', value: 'USR_DOB_DT', align: 'center' },
      { text: '가입일시', value: 'JOIN_DTM', align: 'center' },
      { text: '접속일시', value: 'LSH_LGN_DTM', align: 'center' },
      { text: '건강보험 심사평가원', value: 'HIRA_AGR_YN', align: 'center', sortable: false },
      { text: '건강보험 공단', value: 'NHIS_AGR_YN', align: 'center', sortable: false },
      { text: '질병관리형', value: 'KDCA_AGR_YN', align: 'center', sortable: false }
    ],
    dialog: false,
    dialogForm: {
      id: null,
      name: null,
      agreeDt: null,
      organ: null,
      list: ''
    },
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
    openDialog (type, item) {
      this.dialogForm = {}
      this.dialogForm.id = item.USR_ID
      this.dialogForm.name = item.USR_NM

      if (type === 'HIRA_AGR') {
        // 건강보험심사평가원
        this.dialogForm.organ = '건강보험심사평가원'
        this.dialogForm.list = '투약이력, 진료이력'
      } else if (type === 'NHIS_AGR') {
        // 건강보험 공단
        this.dialogForm.organ = '건강보험 공단'
        this.dialogForm.list = '건강검진'
      } else if (type === 'KDCA_AGR') {
        // 질병관리청
        this.dialogForm.organ = '질병관리청'
        this.dialogForm.list = '예방접종'
      }
      this.dialogForm.agreeDt = item[type + '_DT']
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
          // TODO paging
          // this.searchParam.total = response.pagination.total
          this.searchParam.total = this.usersList.length
        }
      })
    }
  }
}
</script>
