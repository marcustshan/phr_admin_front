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
                @keypress.enter="getNoticeList"
                clearable
                hide-details
              >
                <template v-slot:append-outer>
                  <v-btn small outlined class="black--text" @click="getNoticeList">
                    <v-icon>search</v-icon>
                  </v-btn>
                  <v-btn small outlined class="black--text ml-2" color="#43425d" @click="clearSearchParam(searchParam)">
                    <v-icon>refresh</v-icon>
                  </v-btn>
                </template>
              </v-text-field>
          </v-col>
          <v-col cols="1" align-self="end" class="text-center mb-1">
            <v-btn small min-width="100px" class="white--text" color="#43425d" @click="writeNotice">
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
      :items="noticeList"
      item-key="NTC_ID"
      hide-default-footer
      disable-sort
      disable-hover
      class="bordered condensed click-row history-table"
    >
      <template v-slot:item.modify="{ item }">
        <span class="blue--text pointer" @click="modifyNotice(item)">수정</span>
      </template>
      <template v-slot:[`item.delete`]="{ item }">
        <span class="red--text pointer" @click="deleteNotice(item.NTC_ID)">삭제</span>
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
import noticeService from 'Api/notice/notice.service'

const IN_FORM = {
  IN_NTC_ID: null, // 공지사항 ID
  IN_ADM_SYS_ID: null, // 관리자 시스템 ID
  IN_NTC_ST_CD: null, // 공지사항 유형코드
  IN_NTC_SJ: null, // 공지사항 제목
  IN_NTC_CN: null, // 공지사항 내용
  IN_NTC_IMG_URL: null, // 공지사항 내용 이미지 URL
  IN_NTC_EXP_YN: null, // 앱 팝업 노출 유무
  IN_NTC_PRD_STR: null, // 공지 기간 시작일
  IN_PUP_EXP_YN: null, // 앱 팝업 노출 유무
  IN_PUP_EXP_STR: null, // 앱 팝업 노출 시작일
  IN_PUP_EXP_END: null, // 앱 팝업 노출 종료일
  IN_TOP_EXP_YN: null, // 앱 상단 노출 유무
  IN_TOP_EXP_STR: null, // 앱 상단 노출 시작일
  IN_TOP_EXP_END: null, // 앱 상단 노출 종료일
  IN_PSH_ALR_YN: null, // 앱 푸시 알림 유무
  IN_SAVE_TYP: 'D' // 저장타입(U,D)
}

export default {
  name: 'NoticeList',
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
    headers: [
      { text: 'No', value: 'ROW_NUM', align: 'center' },
      { text: '제목', value: 'NTC_SJ', align: 'center' },
      { text: '등록자', value: 'ADM_ID', align: 'center' },
      { text: '등록일시', value: 'FSR_DTM', align: 'center' },
      { text: '팝업공지', value: 'PUP_EXP_YN', align: 'center' },
      { text: '상단공지', value: 'TOP_EXP_YN', align: 'center' },
      { text: '수정', value: 'modify', align: 'center' },
      { text: '삭제', value: 'delete', align: 'center' }
    ],
    noticeList: [],
    searchInd: [{ code: 'ALL', codeNm: '전체' }, { code: 'NTC_SJ', codeNm: '제목' }, { code: 'ADM_ID', codeNm: '등록자' }],
    searchParam: {
      type: 'ALL',
      search: null,
      sysId: null,
      page: 1,
      size: 10,
      total: 0
    }
  }),
  mounted () {
    if (this.user.ADM_SYS_ID) {
      this.searchParam.sysId = this.user.ADM_SYS_ID
    }
    this.getNoticeList()
  },
  methods: {
    // 공지사항 수정
    modifyNotice (item) {
      this.$router.push({ path: `/notice/modify/${item.NTC_ID}` })
    },
    // 공지사항 삭제
    deleteNotice (noticeSeq) {
      this.inForm.IN_NTC_ID = noticeSeq
      this.inForm.IN_ADM_SYS_ID = this.user.ADM_SYS_ID
      this.$dialog.confirm('선택한 공지사항을 삭제 하시겠습니까?').then(() => {
        noticeService.modifyNotice(this.inForm).then(() => {
          this.$dialog.alert('삭제 되었습니다.').then(() => {
            this.getNoticeList()
          })
        })
      })
    },
    // 공지사항 등록
    writeNotice () {
      this.$router.push({ path: '/notice/write' })
    },
    // 페이징 변경
    pageChange (pageNum) {
      if (this.searchParam.page !== pageNum) {
        this.searchParam.page = pageNum
        this.getNoticeList()
      }
    },
    // 공지사항 조회
    getNoticeList () {
      noticeService.getNoticeList(this.searchParam).then(response => {
        if (response.data) {
          if (typeof response.data === 'object' && Object.keys(response.data).length < 1) {
            response.data = []
          }
          this.noticeList = response.data
          this.searchParam.total = response.headers['paging-total-count']
        }
      })
    }
  }
}
</script>
