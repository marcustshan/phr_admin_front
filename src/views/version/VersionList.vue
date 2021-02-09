<template>
  <div class="content-container">
    <div>
      <v-form lazy-validation>
        <v-row @keypress.enter="getVersionList">
          <v-col cols="3">
            <v-text-field
              v-model="searchParam.q.type"
              append-icon="search"
              clearable
              label="유형"
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="searchParam.q.version"
              append-icon="search"
              clearable
              label="버전"
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="searchParam.q.mode"
              append-icon="search"
              clearable
              label="배포모드"
              hide-details
            ></v-text-field>
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
          <v-btn class="ml-3" outlined rounded color="primary" @click="getVersionList">
            <v-icon left>search</v-icon>
            검색
          </v-btn>
          <v-btn class="ml-3" outlined rounded color="teal darken-1" @click="writeVersion">
            <v-icon left>edit</v-icon>
            등록
          </v-btn>
        </v-col>
      </v-row>
    </div>

    <v-data-table
      :no-data-text="'검색 결과가 없습니다.'"
      :headers="headers"
      :items="versionList"
      item-key="VER_ID"
      hide-default-footer
      disable-sort
      disable-hover
      class="bordered condensed click-row history-table"
    >
      <template v-slot:item.modify="{ item }">
        <v-btn small color="accent" rounded outlined @click="modifyVersion(item)">
          <v-icon small>check</v-icon>수정
        </v-btn>
      </template>
      <template v-slot:item.delete="{ item }">
        <v-btn color="red" outlined dark @click="deleteVersion(item.VER_ID)">
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
import versionService from 'Api/version/version.service'

const IN_FORM = {
  IN_VER_NM: null, // 버전명
  IN_VER_CODE: null, // 버전코드
  IN_PRGM_MGMT_NO: null, // 프로그램 관리번호
  IN_PRGM_NM: null, // 프로그램 명
  IN_MOB_TP_CD: null, // 모바일 코드 (Android, IOS)
  IN_DTB_MODE: null, // 배포모드(운영,개발)
  IN_FRC_UPD_YN: null, // 강제 업데이트 여부
  IN_UPD_AVL_DTM: null, // 업데이트 가능일시
  IN_VER_REG_DT: null, // 버전 등록일시
  IN_PRGM_LSH_CNTE: null, // 업데이트 상세 내용
  IN_USE_YN: null, // 사용여부
  IN_ADM_SYS_ID: null, // 관리자 시스템 ID
  IN_UPD_URL: null, // 업데이트 주소
  IN_SAVE_TYP: 'D'
}

export default {
  name: 'versionList',
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
    inForm: _.cloneDeep(IN_FORM),
    headers: [
      { text: 'No', value: 'VER_ID', align: 'center' },
      { text: '유형', value: 'MOB_TP_CD', align: 'center' },
      { text: '버전', value: 'VER_NM', align: 'center' },
      { text: '배포모드', value: 'DTB_MODE', align: 'center' },
      { text: '등록일시', value: 'FSR_DTM', align: 'center' },
      { text: '수정', value: 'modify', align: 'center' },
      { text: '삭제', value: 'delete', align: 'center' }
    ],
    versionList: [],
    searchParam: {
      q: {
        type: null,
        version: null,
        mode: null
      },
      page: 1,
      size: 10,
      total: 0
    }
  }),
  mounted () {
    this.getVersionList()
  },
  methods: {
    pageChange (pageNum) {
      if (this.searchParam.page !== pageNum) {
        this.searchParam.page = pageNum
        this.getVersionList()
      }
    },
    clearSearchParam () {
      this.searchParam.q = {}
    },
    modifyVersion (item) {
      this.$router.push({ path: `/version/modify/${item.VER_ID}` })
    },
    // 버전관리 삭제
    deleteVersion (versionSeq) {
      this.inForm.IN_VER_ID = versionSeq
      this.inForm.IN_ADM_SYS_ID = this.user.id
      this.$dialog.confirm('삭제 하시겠습니까?').then(() => {
        versionService.modifyVersion(this.inForm).then(() => {
          this.$dialog.alert('삭제 되었습니다.').then(() => {
            this.getVersionList()
          })
        })
      })
    },
    // 버전관리 등록
    writeVersion () {
      this.$router.push({ path: '/version/write' })
    },
    // 버전관리 목록 조회
    getVersionList () {
      versionService.getVersionList(this.searchParam).then(response => {
        if (response.data) {
          if (typeof response.data === 'object' && Object.keys(response.data).length < 1) {
            response.data = []
          }
          this.versionList = response.data
          // TODO paging
          // this.searchParam.total = response.pagination.total
        }
      })
    }
  }
}
</script>
