<template>
  <div class="content-container">
    <v-form ref="form" lazy-validation autocomplete="nope">
      <v-row>
        <v-col md="12">
          <v-simple-table dense>
            <caption>등록자 정보</caption>
            <thead class="detailTable">
            <tr>
              <th class="text-center" scope="col">등록자</th>
              <td>{{ user.ADM_ID }}</td>
              <th class="text-center" scope="col">등록일시</th>
              <td>{{ today }}</td>
            </tr>
            </thead>
          </v-simple-table>
        </v-col>
      </v-row>

      <v-row>
        <v-col md="4" cols="2" class="font-weight-bold">
          <v-icon left color="#43425d">label</v-icon>
          <v-label>공지사항</v-label>
        </v-col>
      </v-row>

      <div class="inputForm">

        <v-row>
          <v-col sm="2" align-self="center" class="text-left font-weight-bold">
            <v-label>
              <v-icon left>keyboard_arrow_right</v-icon>유형</v-label>
          </v-col>
          <v-col sm="3" md="3">
            <!--suppress XmlInvalidId -->
            <label for="searchInd" class="no-display">유형선택</label>
            <v-select
              id="searchInd"
              class="pt-0"
              v-model="form.NTC_ST_CD"
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
            <v-radio-group row v-model="form.NTC_EXP_YN" class="mt-2" hide-details>
              <v-radio label="게시글 노출 안함" value="N" class="pr-2"></v-radio>
              <v-radio label="게시글 노출" value="Y"></v-radio>
            </v-radio-group>
          </v-col>
          <v-col sm="3" md="3">
            <date-picker
              v-model="form.NTC_PRD_STR"
              format="YYYY-MM-DD"
              label="게시일"
              hide-details
              :required="form.NTC_EXP_YN === 'Y' ? true : false"
              :disabled="form.NTC_EXP_YN === 'Y' ? false : true"
            ></date-picker>
          </v-col>
        </v-row>

        <v-row>
          <v-col sm="2" align-self="center" class="font-weight-bold">
            <v-label>
              <v-icon left>keyboard_arrow_right</v-icon>앱 팝업 노출</v-label>
          </v-col>
          <v-col sm="3" md="3">
            <v-radio-group row v-model="form.PUP_EXP_YN" class="mt-2" hide-details>
              <v-radio label="팝업 노출 안함" value="N" class="pr-6"></v-radio>
              <v-radio label="팝업 노출" value="Y"></v-radio>
            </v-radio-group>
          </v-col>
          <v-col sm="3" md="3">
            <date-picker
              v-model="form.PUP_EXP_STR"
              :disabled="form.PUP_EXP_YN === 'Y' ? false : true"
              :required="form.PUP_EXP_YN === 'Y' ? true : false"
              format="YYYY-MM-DD"
              label="시작일"
              hide-details
            ></date-picker>
          </v-col>
          <v-col sm="3" md="3">
            <date-picker
              v-model="form.PUP_EXP_END"
              :min="form.PUP_EXP_STR"
              :disabled="form.PUP_EXP_YN === 'Y' ? false : true"
              :required="form.PUP_EXP_YN === 'Y' ? true : false"
              format="YYYY-MM-DD"
              label="종료일"
              hide-details
            ></date-picker>
          </v-col>
        </v-row>

        <v-row>
          <v-col sm="2" align-self="center" class="font-weight-bold">
            <v-label>
              <v-icon left>keyboard_arrow_right</v-icon>앱 상단 노출</v-label>
          </v-col>
          <v-col sm="3" md="3">
            <v-radio-group row v-model="form.TOP_EXP_YN" class="mt-2" hide-details>
              <v-radio label="상단 노출 안함" value="N" class="pr-6"></v-radio>
              <v-radio label="상단 노출" value="Y"></v-radio>
            </v-radio-group>
          </v-col>
          <v-col sm="3" md="3">
            <date-picker
              v-model="form.TOP_EXP_STR"
              :disabled="form.TOP_EXP_YN === 'Y' ? false : true"
              :required="form.TOP_EXP_YN === 'Y' ? true : false"
              format="YYYY-MM-DD"
              label="시작일"
              hide-details
            ></date-picker>
          </v-col>
          <v-col sm="3" md="3">
            <date-picker
              v-model="form.TOP_EXP_END"
              :min="form.TOP_EXP_STR"
              :disabled="form.TOP_EXP_YN === 'Y' ? false : true"
              :required="form.TOP_EXP_YN === 'Y' ? true : false"
              format="YYYY-MM-DD"
              label="종료일"
              hide-details
            ></date-picker>
          </v-col>
        </v-row>

        <v-row>
          <v-col sm="2" align-self="center" class="font-weight-bold">
            <v-label>
              <v-icon left>keyboard_arrow_right</v-icon>앱 푸시 알림</v-label>
          </v-col>
          <v-col sm="3" md="3">
            <v-radio-group row v-model="form.PSH_ALR_YN" class="mt-2" hide-details>
              <v-radio label="푸시 알림 안함" value="N" class="pr-6"></v-radio>
              <v-radio label="푸시 알림" value="Y"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>

        <v-row>
          <v-col sm="2" align-self="center" class="font-weight-bold">
            <v-label>
              <v-icon left>keyboard_arrow_right</v-icon>제목</v-label>
          </v-col>
          <v-col sm="10">
            <v-text-field
              v-model="form.NTC_SJ"
              label="제목"
              :rules="emptyRules"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col sm="2" align-self="center" class="font-weight-bold">
            <v-label>
              <v-icon left>keyboard_arrow_right</v-icon>이미지</v-label>
          </v-col>
          <v-col sm="10">
            <v-btn
              elevation="2"
              color="primary"
              @click="openImageInput"
            >
              이미지 등록
            </v-btn>
            <v-btn class="ml-2" color="error" v-if="uploadFile || form.NTC_IMG_URL" @click="deleteImage">삭제</v-btn>
            <br />
            <img v-show="showPreviewImage" class="preview-image" id="previewImage" alt="공지사항 이미지" />
            <img v-show="!showPreviewImage && form.NTC_IMG_URL" class="uploaded-image" :src="`${downloadHostUrl}/web/GetImage/notice/${form.NTC_IMG_URL}`" :alt="form.NTC_SJ ? form.NTC_SJ : '공지사항 이미지'">
            <label for="noticeImage" class="no-display">첨부파일</label>
            <input id="noticeImage" class="no-display" type="file" accept="image/*" @change="imageChanged" />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <ckeditor type="classic" v-model="form.NTC_CN"></ckeditor>
          </v-col>
          <v-col cols="12" class="pt-0" v-if="editorValid">
            <div class="v-text-field__details">
              <div class="v-messages theme--light error--text" role="alert">
                <div class="v-messages__wrapper"><div class="v-messages__message">필수 입력항목입니다.</div></div>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
      <v-row>
        <v-col cols="12" class="text-center">
          <v-btn outlined color="primary" class="mr-5" @click="saveNoticeDetail">{{!this.isModify ? '등록' : '수정'}}하기</v-btn>
          <v-btn outlined color="brown lighten-2" @click="goNoticeList">목록</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import noticeService from 'Api/notice/notice.service'
import dayjs from 'dayjs'

const DEFAULT_FORM = {
  ADM_SYS_ID: null,
  NTC_ST_CD: 'G', // 유형
  NTC_IMG_URL: null, // 공지사항 내용 이미지 URL
  NTC_EXP_YN: 'Y', // 앱 게시글 노출여부
  PUP_EXP_YN: 'Y', // 팝업 노출여부
  TOP_EXP_YN: 'N', // 상단 노출여부
  PSH_ALR_YN: 'N', // 푸시 알림여부
  NTC_PRD_STR: null, // 게시일
  PUP_EXP_STR: null, // 팝업 시작일
  PUP_EXP_END: null, // 팝업 종료일
  TOP_EXP_STR: null, // 상단 시작일
  TOP_EXP_END: null // 상단 종료일
}

const IN_FORM = {
  IN_ADM_SYS_ID: null,
  IN_NTC_ST_CD: null,
  IN_NTC_SJ: null,
  IN_NTC_CN: null,
  IN_NTC_IMG_URL: null,
  IN_NTC_EXP_YN: null,
  IN_NTC_PRD_STR: null,
  IN_PUP_EXP_YN: null,
  IN_PUP_EXP_STR: null,
  IN_PUP_EXP_END: null,
  IN_TOP_EXP_YN: null,
  IN_TOP_EXP_STR: null,
  IN_TOP_EXP_END: null,
  IN_PSH_ALR_YN: null
}

export default {
  name: 'NoticeWrite',
  computed: {
    ...mapGetters({
      downloadHostUrl: 'common/downloadHostUrl'
    }),
    user () {
      return this.$store.state.user.userInfo
    },
    isModify () {
      return this.noticeSeq && this.noticeSeq > 0
    }
  },
  data: () => ({
    form: _.cloneDeep(DEFAULT_FORM),
    inForm: _.cloneDeep(IN_FORM),
    indList: [{ code: 'G', codeNm: '일반' }, { code: 'E', codeNm: '긴급' }], // 유형(일반,긴급)
    noticeSeq: -1,
    editorValid: false, // ckeditor 유효성
    today: dayjs().format('YYYY-MM-DD HH:mm'),
    showPreviewImage: false,
    uploadFile: undefined
  }),
  mounted () {
    // 수정
    if (this.$route.params && this.$route.params.noticeSeq) {
      this.noticeSeq = this.$route.params.noticeSeq
      this.getNoticeDetail(this.noticeSeq)
    }
  },
  methods: {
    // 이미지 삭제
    deleteImage () {
      this.uploadFile = null
      this.showPreviewImage = false
      document.getElementById('previewImage').src = null
      this.form.NTC_IMG_URL = null
    },
    // 이미지 등록 버튼 클릭 event
    openImageInput () {
      document.getElementById('noticeImage').click()
    },
    // 이미지 선택
    imageChanged ($event) {
      if ($event.target.files && $event.target.files.length > 0) {
        const vm = this
        const reader = new FileReader()

        reader.onload = function (e) {
          vm.showPreviewImage = true
          document.getElementById('previewImage').src = e.target.result

          vm.uploadFile = e.target.result
        }

        reader.readAsDataURL($event.target.files[0])
      }
    },
    // 공지사항 목록
    goNoticeList () {
      this.$router.push({ path: '/notice/list', name: 'noticeList', params: { item: this.$route.params.q } })
    },
    // 공지사항 상세조회
    getNoticeDetail (noticeSeq) {
      const param = { IN_ADM_SYS_ID: this.user.ADM_SYS_ID, IN_NTC_ID: noticeSeq }
      noticeService.getNoticeDetail(param).then((response) => {
        if (response.data && response.data.length > 0) {
          this.form = response.data[0]
        }
      })
    },
    // 공지사항 저장
    saveNoticeDetail () {
      this.editorValid = false
      this.validForm(this.$refs.form).then(() => {
        if (this.isEmpty(this.form.NTC_CN)) {
          this.editorValid = true
        } else {
          // 등록, 수정시 param 'IN_' 붙여야함
          this.setParamIn()
          this.$dialog.confirm((this.isModify ? '수정' : '저장') + ' 하시겠습니까?').then(async () => {
            if (this.uploadFile) {
              const uploadResponse = await noticeService.uploadFile(this.uploadFile)
              if (uploadResponse.data && uploadResponse.data.FileUploadNoticeResult) {
                const fileName = uploadResponse.data.FileUploadNoticeResult
                this.inForm.IN_NTC_IMG_URL = fileName
              }
            }
            if (this.isModify) {
              await noticeService.modifyNotice(this.inForm)
            } else {
              await noticeService.writeNotice(this.inForm)
            }
            this.$dialog.alert((this.isModify ? '수정' : '저장') + ' 되었습니다.').then(() => {
              this.$router.push({ path: '/notice/list' })
            })
          })
        }
      })
    },
    // 저장, 수정시 param 명 변경
    setParamIn () {
      Object.keys(this.form).forEach(key => {
        if (_.has(this.inForm, 'IN_' + key)) {
          this.inForm['IN_' + key] = this.form[key]
        }
      })
      this.inForm.IN_ADM_SYS_ID = this.user.ADM_SYS_ID
      // 수정시
      if (this.isModify) {
        this.inForm.IN_NTC_ID = this.noticeSeq
        this.inForm.IN_SAVE_TYP = 'U'
      }
    }
  }
}
</script>

<style scoped>
  .preview-image { margin-top: 5px; max-height: 170px; }
  .uploaded-image { max-height: 200px; margin-top: 5px; }
</style>
