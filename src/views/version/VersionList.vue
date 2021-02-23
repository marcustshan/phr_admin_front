<template>
  <div class="content-container">
    <div>
      <v-form ref="form" lazy-validation autocomplete="off">
        <v-row dense>
          <v-col cols="1" class="ml-auto">
            <v-select
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
              @keypress.enter="getVersionList"
              clearable
              hide-details
            >
              <template v-slot:append-outer>
                <v-btn small outlined class="black--text" @click="getVersionList">
                  <v-icon>search</v-icon>
                </v-btn>
                <v-btn small outlined class="black--text ml-2" color="#43425d" @click="clearSearchParam(searchParam)">
                  <v-icon>refresh</v-icon>
                </v-btn>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="1" align-self="end" class="text-center mb-1">
            <v-btn small min-width="100px" class="white--text" color="#43425d" @click="writeVersion">
              <v-icon left>edit</v-icon>
              등록
            </v-btn>
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
      :items="versionList"
      item-key="VER_ID"
      hide-default-footer
      disable-sort
      disable-hover
      class="bordered condensed click-row history-table"
    >
      <template v-slot:item.DTB_MODE="{ item }">
        {{ item.DTB_MODE === 'D' ? '개발' : '운영' }}
      </template>
      <template v-slot:item.modify="{ item }">
        <span class="blue--text pointer" @click="modifyVersion(item)">수정</span>
      </template>
      <template v-slot:item.delete="{ item }">
        <span class="red--text pointer" @click="deleteVersion(item.VER_ID)">삭제</span>
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
      return Number(this.searchParam.total) !== 0 ? Math.ceil(this.searchParam.total / this.searchParam.size) : 1
    },
    user () {
      return this.$store.state.user.userInfo
    }
  },
  data: () => ({
    inForm: _.cloneDeep(IN_FORM),
    searchInd: [{ code: 'ALL', codeNm: '전체' }, { code: 'MOB_TP_CD', codeNm: '유형' }, { code: 'DTB_MODE', codeNm: '배포모드' }, { code: 'ADM_ID', codeNm: '등록자' }],
    headers: [
      { text: 'No', value: 'ROW_NUM', align: 'center' },
      { text: '유형', value: 'MOB_TP_CD', align: 'center' },
      { text: '버전', value: 'VER_NM', align: 'center' },
      { text: '배포모드', value: 'DTB_MODE', align: 'center' },
      { text: '등록자', value: 'ADM_ID', align: 'center' },
      { text: '등록일시', value: 'FSR_DTM', align: 'center' },
      { text: '수정', value: 'modify', align: 'center' },
      { text: '삭제', value: 'delete', align: 'center' }
    ],
    versionList: [],
    searchParam: {
      type: 'ALL',
      search: null,
      page: 1,
      size: 10,
      total: 0
    }
  }),
  mounted () {
    if (this.user.ADM_SYS_ID) {
      this.searchParam.sysId = this.user.ADM_SYS_ID
    }
    // 검색조건 유지
    if (this.$route.params.item) {
      this.searchParam.page = this.$route.params.item.page
      this.searchParam.type = this.$route.params.item.type
      this.searchParam.search = this.$route.params.item.search
    }
    this.getVersionList()
  },
  methods: {
    pageChange (pageNum) {
      if (this.searchParam.page !== pageNum) {
        this.searchParam.page = pageNum
        this.getVersionList()
      }
    },
    modifyVersion (item) {
      this.$router.push({
        path: '/version/modify',
        name: 'versionModify',
        params: {
          versionSeq: item.VER_ID,
          q: {
            page: this.searchParam.page,
            type: this.searchParam.type,
            search: this.searchParam.search
          }
        }
      })
    },
    // 버전관리 삭제
    deleteVersion (versionSeq) {
      this.inForm.IN_VER_ID = versionSeq
      this.inForm.IN_ADM_SYS_ID = this.user.ADM_SYS_ID
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
      if (!this.isEmpty(this.searchParam.search)) {
        this.searchParam.page = 1
      }
      versionService.getVersionList(this.searchParam).then(response => {
        if (response.data) {
          if (typeof response.data === 'object' && Object.keys(response.data).length < 1) {
            response.data = []
          }
          this.versionList = response.data
          this.searchParam.total = response.headers['paging-total-count']
        }
      })
    }
  }
}
</script>
