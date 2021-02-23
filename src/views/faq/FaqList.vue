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
              @keypress.enter="getFaqList"
              clearable
              hide-details
            >
              <template v-slot:append-outer>
                <v-btn small outlined class="black--text" @click="getFaqList">
                  <v-icon>search</v-icon>
                </v-btn>
                <v-btn small outlined class="black--text ml-2" color="#43425d" @click="clearSearchParam(searchParam)">
                  <v-icon>refresh</v-icon>
                </v-btn>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="1" align-self="end" class="text-center mb-1">
            <v-btn small min-width="100px" class="white--text" color="#43425d" @click="writeFaq">
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
      :items="faqList"
      item-key="FAQ_ID"
      hide-default-footer
      disable-sort
      disable-hover
      class="bordered condensed click-row history-table"
    >
      <template v-slot:item.FAQ_ST_CD = {item}>
          {{item.FAQ_ST_CD === 'A' ? '계정' : '서비스이용'}}
      </template>
      <template v-slot:item.modify="{ item }">
        <span class="blue--text pointer" @click="modifyFaq(item)">수정</span>
      </template>
      <template v-slot:item.delete="{ item }">
        <span class="red--text pointer" @click="deleteFaq(item.FAQ_ID)">삭제</span>
      </template>
    </v-data-table>

    <v-pagination :value="searchParam.page" :total-visible="10" :length="pages" circle class="mt-3" @input="pageChange($event)" ></v-pagination>
  </div>
</template>

<script>
import faqService from 'Api/faq/faq.service'

const IN_FORM = {
  IN_FAQ_SJ: null, // FAQ 제목
  IN_FAQ_CN: null, // FAQ 내용
  IN_FAQ_ST_CD: null, // 질문유형 코드
  IN_FAQ_EXP_YN: null, // FAQ 노출 유무
  IN_DEL_YN: null, // 삭제여부
  IN_FAQ_ID: null, // FAQ ID
  IN_ADM_SYS_ID: null, // 관리자 시스템 ID
  IN_SAVE_TYP: 'D' // 저장타입
}

export default {
  name: 'FaqList',
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
    searchInd: [{ code: 'ALL', codeNm: '전체' }, { code: 'FAQ_SJ', codeNm: '제목' }, { code: 'ADM_ID', codeNm: '등록자' }],
    headers: [
      { text: 'No', value: 'ROW_NUM', align: 'center' },
      { text: '유형', value: 'FAQ_ST_CD', align: 'center' },
      { text: '질문 제목', value: 'FAQ_SJ', align: 'center' },
      { text: '등록자', value: 'ADM_ID', align: 'center' },
      { text: '등록일시', value: 'FSR_DTM', align: 'center' },
      { text: '수정', value: 'modify', align: 'center' },
      { text: '삭제', value: 'delete', align: 'center' }
    ],
    faqList: [],
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
    // 검색조건 유지
    if (this.$route.params.item) {
      this.searchParam.page = this.$route.params.item.page
      this.searchParam.type = this.$route.params.item.type
      this.searchParam.search = this.$route.params.item.search
    }
    // faq 목록 조회
    this.getFaqList()
  },
  methods: {
    // 페이지 변경
    pageChange (pageNum) {
      if (this.searchParam.page !== pageNum) {
        this.searchParam.page = pageNum
        this.getFaqList()
      }
    },
    // 자주묻는 질문 수정
    modifyFaq (item) {
      this.$router.push({
        path: '/faq/modify',
        name: 'faqModify',
        params: {
          faqSeq: item.FAQ_ID,
          q: {
            page: this.searchParam.page,
            type: this.searchParam.type,
            search: this.searchParam.search
          }
        }
      })
    },
    // faq 삭제
    deleteFaq (faqSeq) {
      this.inForm.IN_FAQ_ID = faqSeq
      this.inForm.IN_ADM_SYS_ID = this.user.ADM_SYS_ID
      this.$dialog.confirm('선택한 질문 및 답변을 삭제 하시겠습니까?').then(() => {
        faqService.modifyFaq(this.inForm).then(() => {
          this.$dialog.alert('삭제 되었습니다.').then(() => {
            this.getFaqList()
          })
        })
      })
    },
    // faq 등록
    writeFaq () {
      this.$router.push({ path: '/faq/write' })
    },
    // faq 목록 조회
    getFaqList () {
      if (!this.isEmpty(this.searchParam.search)) {
        this.searchParam.page = 1
      }
      faqService.getFaqList(this.searchParam).then(response => {
        if (response.data) {
          if (typeof response.data === 'object' && Object.keys(response.data).length < 1) {
            response.data = []
          }
          this.faqList = response.data
          this.searchParam.total = response.headers['paging-total-count']
        }
      })
    }
  }
}
</script>
