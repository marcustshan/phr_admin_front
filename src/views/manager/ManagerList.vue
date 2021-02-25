<template>
  <div class="content-container">
    <div>
      <v-row justify="space-between">
        <v-col cols="4" align-self="center">
          <div class="black--text">총 {{searchParam.total}} 건 {{searchParam.page}} / {{pages}} 페이지</div>
        </v-col>
        <v-col cols="1" align-self="end" class="text-center ml-auto">
          <v-btn small min-width="100px" class="white--text" color="#43425d" @click="writeManager">
            <v-icon left>edit</v-icon>
            등록
          </v-btn>
        </v-col>
      </v-row>
    </div>

    <v-data-table
      :no-data-text="'검색 결과가 없습니다.'"
      :headers="headers"
      :items="managerList"
      item-key="ADM_SYS_ID"
      hide-default-footer
      disable-sort
      disable-hover
      class="bordered condensed click-row history-table"
      caption="관리자 계정관리 목록"
    >
      <template v-slot:item.ADM_NM = {item}>
        <span @click="goDetailPage(item)" class="blue--text pointer text-decoration-underline">
          {{ item.ADM_NM }}
        </span>
      </template>
      <template v-slot:item.ADM_BLK_YN = {item}>
        <span @click="item.ADM_BLK_YN === 'Y' ? confirmAction('ADM_BLK_YN', item) : ''" :class="item.ADM_BLK_YN === 'Y' ? 'blue--text pointer text-decoration-underline' : 'text--disabled'">
          초기화
        </span>
      </template>
      <template v-slot:item.DOR_YN = {item}>
        <span @click="item.DOR_YN === 'Y' ? confirmAction('DOR_YN', item) : ''" :class="item.DOR_YN === 'Y' ? 'blue--text pointer text-decoration-underline' : 'text--disabled'">
          해제
        </span>
      </template>
      <template v-slot:item.delete="{ item }">
        <span class="red--text pointer" @click="confirmAction('DELETE', item)">삭제</span>
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
import managerService from 'Api/manager/manager.service'

export default {
  name: 'managerList',
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
      { text: 'No', value: 'ROW_NUM', align: 'center' },
      { text: 'ID', value: 'ADM_ID', align: 'center' },
      { text: '이름', value: 'ADM_NM', align: 'center' },
      { text: '이메일', value: 'ADM_EML', align: 'center' },
      { text: '비밀번호 초기화', value: 'ADM_BLK_YN', align: 'center' },
      { text: '장기 미접속', value: 'DOR_YN', align: 'center' },
      { text: '계정 삭제', value: 'delete', align: 'center' }
    ],
    managerList: [],
    searchParam: {
      sysId: null,
      page: 1,
      size: 10,
      total: 0
    },
    resetForm: {
      IN_ADM_SYS_ID: null,
      IN_INIT_ADM_ID: null,
      IN_ADM_DOB_DT: 1
    }
  }),
  created () {
  },
  mounted () {
    if (this.user.ADM_SYS_ID) {
      this.searchParam.sysId = this.user.ADM_SYS_ID
    }
    this.getManagerList()
  },
  methods: {
    pageChange (pageNum) {
      if (this.searchParam.page !== pageNum) {
        this.searchParam.page = pageNum
        this.getManagerList()
      }
    },
    // 초기화, 미접속해제, 계정삭제
    confirmAction (type, item) {
      let msg = item.ADM_NM + '(' + item.ADM_ID + ') '
      if (type === 'ADM_BLK_YN') {
        // 초기화
        msg += '비밀번호를 초기화 하시겠습니까?'
      } else if (type === 'DOR_YN') {
        // 장기 미접속 해제
        msg += '장기 미접속 제한을 해제하시겠습니까?'
      } else {
        // 계정 삭제
        msg += '계정을 삭제하시겠습니까?<br>삭제된 계정은 복원할 수 없습니다.'
      }
      this.$dialog.confirm(msg).then(() => {
        this.resetForm.IN_ADM_SYS_ID = item.ADM_SYS_ID
        this.resetForm.IN_INIT_ADM_ID = item.ADM_ID
        if (type === 'DELETE') {
          // 관리자 삭제
          this.deleteManager(item)
        } else if (type === 'ADM_BLK_YN') {
          // 비밀번호 초기화
          managerService.resetManagePw(this.resetForm).then(res => {
            if (res.data.length > 0) {
              this.$dialog.alert('비밀번호가 초기화 되었습니다.').then(() => {
                this.getManagerList()
              })
            }
          })
        } else if (type === 'DOR_YN') {
          // 장기 미접속 해제
          managerService.dorYnManage(this.resetForm).then(res => {
            if (res.data.length > 0) {
              this.$dialog.alert('장기 미접속이 해제 되었습니다.').then(() => {
                this.getManagerList()
              })
            }
          })
        }
      })
    },
    // 상세페이지 이동
    goDetailPage (item) {
      this.$router.push({ path: '/manager/detail', name: 'managerDetail', params: { item: item } })
    },
    // 관리자 추가
    writeManager () {
      this.$router.push({ path: '/manager/write' })
    },
    // 관리자 삭제
    deleteManager (item) {
      const param = { IN_ADM_ID: item.ADM_ID, IN_ADM_EML: item.ADM_EML }
      managerService.deleteManager(param).then(() => {
        this.$dialog.alert('삭제 되었습니다.').then(() => {
          this.getManagerList()
        })
      })
    },
    // 관리자 목록 조회
    getManagerList () {
      managerService.getManagerList(this.searchParam).then(response => {
        if (response.data) {
          if (typeof response.data === 'object' && Object.keys(response.data).length < 1) {
            response.data = []
          }
          this.managerList = response.data
          this.searchParam.total = response.headers['paging-total-count']
        }
      })
    }
  }
}
</script>
