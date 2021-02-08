<template>
  <div class="content-container">
    <v-form ref="form" lazy-validation class="mt-10">
      <v-row>
        <v-col md="12">
          <v-simple-table dense>
            <thead class="detailTable">
            <tr>
              <th class="text-center">등록자</th>
              <td colspan="3">{{ user.id }}</td>
              <th class="text-center">등록일시</th>
              <td colspan="3">{{ today }}</td>
            </tr>
            </thead>
          </v-simple-table>
        </v-col>
      </v-row>

      <div class="inputForm">
        <v-row class="pt-3 pb-3">
          <v-col md="4" cols="2">
            <v-icon left color="#43425d">label</v-icon>
            <v-label>자주 묻는 질문</v-label>
          </v-col>
        </v-row>

        <v-row>
          <v-col sm="2" align-self="center" class="text-left font-weight-bold">
            <v-label>
              <v-icon left>keyboard_arrow_right</v-icon>유형</v-label>
          </v-col>
          <v-col sm="3" md="3">
            <v-select
              class="pt-0"
              v-model="form.FAQ_ST_CD"
              :items="indList"
              hide-details
              item-text="codeNm"
              item-value="code"
            ></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col sm="2" align-self="center" class="font-weight-bold">
            <v-label>
              <v-icon left>keyboard_arrow_right</v-icon>앱 게시글 노출</v-label>
          </v-col>
          <v-col sm="3" md="3">
            <v-radio-group row v-model="form.FAQ_EXP_YN" class="mt-2" hide-details>
              <v-radio label="게시글 노출 안함" value="N" class="pr-2"></v-radio>
              <v-radio label="게시글 노출" value="Y"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>

        <v-row>
          <v-col sm="2" align-self="center" class="font-weight-bold">
            <v-label>
              <v-icon left>keyboard_arrow_right</v-icon>질문</v-label>
          </v-col>
          <v-col sm="10">
            <v-text-field dense
              v-model="form.FAQ_SJ"
              :rules="emptyRules"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col sm="12">
            <v-textarea
              class="mt-5"
              outlined
              label="내용"
              height="500"
              :rules="emptyRules"
              v-model="form.FAQ_CN"
            ></v-textarea>
          </v-col>
        </v-row>
      </div>
      <v-row>
        <v-col cols="12" class="text-center">
          <v-btn outlined color="primary" class="mr-5" @click="saveFaqDetail">{{!this.isModify ? '등록' : '수정'}}하기</v-btn>
          <v-btn outlined color="brown lighten-2" @click="goFaqList">목록</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import faqService from 'Api/faq/faq.service'
import dayjs from 'dayjs'

const DEFAULT_FORM = {
  FAQ_SJ: null, // 제목
  FAQ_CN: null, // 내용
  FAQ_ST_CD: 'A', // 유형
  FAQ_EXP_YN: 'Y', // 노출유무
  ADM_SYS_ID: null,
  DEL_YN: null
}

const IN_FORM = {
  IN_FAQ_SJ: null,
  IN_FAQ_CN: null,
  IN_FAQ_ST_CD: null,
  IN_FAQ_EXP_YN: null,
  IN_DEL_YN: 'N',
  IN_ADM_SYS_ID: null
}

export default {
  name: 'FaqWrite',
  computed: {
    user () {
      return this.$store.state.user.userInfo
    },
    isModify () {
      return this.faqSeq && this.faqSeq > 0
    }
  },
  data: () => ({
    form: _.cloneDeep(DEFAULT_FORM),
    inForm: _.cloneDeep(IN_FORM),
    indList: [{ code: 'A', codeNm: '계정' }, { code: 'S', codeNm: '서비스이용' }], // 유형
    faqSeq: -1,
    today: dayjs().format('YYYY-MM-DD HH:mm')
  }),
  mounted () {
    // 수정
    if (this.$route.params && this.$route.params.faqSeq) {
      this.faqSeq = this.$route.params.faqSeq
      this.getFaqDetail(this.faqSeq)
    }
  },
  methods: {
    // FAQ 목록
    goFaqList () {
      this.$router.push({ path: '/faq/list' })
    },
    // FAQ 상세조회
    getFaqDetail (faqSeq) {
      const param = { IN_ADM_SYS_ID: this.user.id, IN_FAQ_NO: faqSeq }
      faqService.getFaqDetail(param).then((response) => {
        if (response.data && response.data.length > 0) {
          this.form = response.data[0]
        }
      })
    },
    // FAQ 저장
    saveFaqDetail () {
      if (!this.$refs.form.validate()) {
        return
      }
      // 등록, 수정시 param 'IN_' 붙여야함
      this.setParamIn()
      this.$dialog.confirm((this.isModify ? '수정' : '저장') + ' 하시겠습니까?').then(() => {
        if (this.isModify) {
          faqService.modifyFaq(this.inForm)
        } else {
          faqService.writeFaq(this.inForm)
        }
        this.$dialog.alert((this.isModify ? '수정' : '저장') + ' 되었습니다.').then(() => {
          this.$router.push({ path: '/faq/list' })
        })
      })
    },
    // 저장, 수정시 param 명 변경
    setParamIn () {
      Object.keys(this.form).forEach(key => {
        if (_.has(this.inForm, 'IN_' + key)) {
          this.inForm['IN_' + key] = this.form[key]
        }
      })
      this.inForm.IN_ADM_SYS_ID = this.user.id
      // 수정시
      if (this.isModify) {
        this.inForm.IN_FAQ_ID = this.faqSeq
        this.inForm.IN_SAVE_TYP = 'U'
      } else {
        // 등록시
        this.inForm.IN_DEL_YN = 'N'
      }
    }
  }
}
</script>