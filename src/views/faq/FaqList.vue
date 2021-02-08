<template>
  <div class="content-container">
    <div>
      <v-form lazy-validation>
        <v-row @keypress.enter="getFaqList">
          <v-col cols="3">
            <v-text-field
              v-model="searchParam.title"
              append-icon="search"
              clearable
              label="제목"
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
          <v-btn class="ml-3" outlined rounded color="primary" @click="getFaqList">
            <v-icon left>search</v-icon>
            검색
          </v-btn>
          <v-btn class="ml-3" outlined rounded color="teal darken-1" @click="writeFaq">
            <v-icon left>edit</v-icon>
            등록
          </v-btn>
        </v-col>
      </v-row>
    </div>

    <v-data-table
      :no-data-text="'검색 결과가 없습니다.'"
      :headers="headers"
      :items="faqList"
      item-key="hisSeq"
      hide-default-footer
      disable-sort
      disable-hover
      class="bordered condensed click-row history-table"
    >
      <template v-slot:item.FAQ_ST_CD = {item}>
          {{item.FAQ_ST_CD === 'A' ? '계정' : '서비스이용'}}
      </template>
      <template v-slot:item.modify="{ item }">
        <v-btn small color="accent" rounded outlined @click="modifyFaq(item)">
          <v-icon small>check</v-icon>수정
        </v-btn>
      </template>
      <template v-slot:item.delete="{ item }">
        <v-btn color="red" outlined dark @click="deleteFaq(item.FAQ_ID)">
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
import faqService from 'Api/faq/faq.service'

const IN_FORM = {
  IN_FAQ_SJ: null,
  IN_FAQ_CN: null,
  IN_FAQ_ST_CD: null,
  IN_FAQ_EXP_YN: null,
  IN_DEL_YN: null,
  IN_FAQ_ID: null,
  IN_ADM_SYS_ID: null,
  IN_SAVE_TYP: 'D'
}

export default {
  name: 'FaqList',
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
      { text: 'No', value: 'FAQ_ID', align: 'center' },
      { text: '유형', value: 'FAQ_ST_CD', align: 'center' },
      { text: '질문 제목', value: 'FAQ_SJ', align: 'center' },
      { text: '등록일시', value: 'FSR_DTM', align: 'center' },
      { text: '수정', value: 'modify', align: 'center' },
      { text: '삭제', value: 'delete', align: 'center' }
    ],
    faqList: [],
    searchParam: {
      title: null,
      page: 1,
      size: 10,
      total: 0
    }
  }),
  mounted () {
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
    // 검색조건 초기화
    clearSearchParam () {
      this.searchParam.title = null
    },
    // 자주묻는 질문 수정
    modifyFaq (item) {
      this.$router.push({ path: `/faq/modify/${item.FAQ_ID}` })
    },
    // faq 삭제
    deleteFaq (faqSeq) {
      this.inForm.IN_FAQ_ID = faqSeq
      this.inForm.IN_ADM_SYS_ID = this.user.id
      this.$dialog.confirm('삭제 하시겠습니까?').then(() => {
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
      faqService.getFaqList(this.searchParam).then(response => {
        if (response.data) {
          if (typeof response.data === 'object' && Object.keys(response.data).length < 1) {
            response.data = []
          }
          this.faqList = response.data
          // TODO paging
          // this.searchParam.total = response.pagination.total
        }
      })
    }
  }
}
</script>
