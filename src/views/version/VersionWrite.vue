<template>
  <div class="content-container">
    <v-form ref="form" lazy-validation autocomplete="off">
      <v-row>
        <v-col md="12">
          <v-simple-table dense>
            <caption>등록자 정보</caption>
            <thead class="detailTable">
            <tr>
              <th class="text-center" scope="col">APP명</th>
              <td colspan="3">나의건강기록 APP</td>
            </tr>
            <tr>
              <th class="text-center" scope="col">등록자</th>
              <td>{{user.ADM_NM}}({{user.ADM_ID}})</td>
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
          <v-label>버전 {{isModify ? '수정' : '등록'}}</v-label>
        </v-col>
      </v-row>

      <div class="inputForm">

        <v-row>
          <v-col sm="2" align-self="center" class="text-left font-weight-bold">
            <v-label>
              <v-icon left>keyboard_arrow_right</v-icon>유형</v-label>
          </v-col>
          <v-col sm="2">
            <!--suppress XmlInvalidId -->
            <label for="selectTpCd" class="no-display">유형선택</label>
            <v-select
              id="selectTpCd"
              class="pt-0"
              v-model="form.MOB_TP_CD"
              :items="typeList"
              hide-details
              item-text="codeNm"
              item-value="code"
            ></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col sm="2" align-self="center" class="font-weight-bold">
            <v-label><v-icon left>keyboard_arrow_right</v-icon>버전코드</v-label>
          </v-col>
          <v-col sm="2" class="pb-0">
            <v-text-field v-model="form.VER_CODE" :rules="numberRules.concat(emptyRules)" dense label="버전코드"></v-text-field>
          </v-col>
          <v-col align-self="center" class="grey--text">
            <small>최신버전 검토하기 위한 앱의 내부 버전 코드 (예: 1)</small>
          </v-col>
        </v-row>

        <v-row>
          <v-col sm="2" align-self="center" class="font-weight-bold">
            <v-label>
              <v-icon left>keyboard_arrow_right</v-icon>버전명</v-label>
          </v-col>
          <v-col sm="2" class="pb-0">
            <v-text-field v-model="form.VER_NM" :rules="emptyRules.concat(versionRules)" dense hint="예시) 1.2" label="버전명"></v-text-field>
          </v-col>
          <v-col align-self="center" class="grey--text">
            <small>사용자에게 공개되는 앱의 배포 버전 (예: 1.0)</small>
          </v-col>
        </v-row>

        <v-row>
          <v-col sm="2" align-self="center" class="font-weight-bold">
            <v-label>
              <v-icon left>keyboard_arrow_right</v-icon>배포모드</v-label>
          </v-col>
          <v-col sm="3" class="pb-0">
            <v-radio-group row v-model="form.DTB_MODE" class="mt-1 pt-0" hide-details dense>
              <v-radio label="운영" value="P"></v-radio>
              <v-radio label="개발" value="D"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>

        <v-row>
          <v-col sm="2" align-self="center" class="font-weight-bold">
            <v-label>
              <v-icon left>keyboard_arrow_right</v-icon>업데이트 주소</v-label>
          </v-col>
          <v-col sm="6" class="pb-0">
            <v-text-field dense v-model="form.UPD_URL" :rules="emptyRules" label="업데이트 주소"></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col sm="2" align-self="center" class="font-weight-bold">
            <v-label>
              <v-icon left>keyboard_arrow_right</v-icon>설명</v-label>
          </v-col>
          <v-col sm="4" class="pb-0">
            <v-text-field dense v-model="form.PRGM_LSH_CNTE" hint="버전에 대한 설명을 작성해주세요." label="버전설명"></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col sm="2" align-self="center" class="font-weight-bold">
            <v-label>
              <v-icon left>keyboard_arrow_right</v-icon>강제 업데이트 여부</v-label>
          </v-col>
          <v-col sm="3" md="3">
            <v-radio-group row v-model="form.FRC_UPD_YN" class="mt-1 pt-0" hide-details dense>
              <v-radio label="사용" value="Y"></v-radio>
              <v-radio label="미사용" value="N"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>

        <v-row>
          <v-col sm="2" align-self="center" class="font-weight-bold">
            <v-label>
              <v-icon left>keyboard_arrow_right</v-icon>업데이트 가능 일시</v-label>
          </v-col>
          <v-col sm="2" class="mr-3">
            <date-picker
              v-model="updAvlDtm"
              :min="minDate"
              format="YYYYMMDD"
              hide-details
              label="업데이트 일시"
            ></date-picker>
          </v-col>
          <v-col sm="2" class="pt-4">
            <!--suppress XmlInvalidId -->
            <label for="selectTime" class="no-display">시간선택</label>
            <vue-timepicker v-model="timeLine" hour-label="시" minute-label="분" placeholder="시간선택" @change="checkHour = false" id="selectTime"></vue-timepicker>
            <div class="v-text-field__details mt-1" v-if="checkHour">
              <div class="v-messages theme--light error--text" role="alert">
                <div class="v-messages__wrapper">
                  <div class="v-messages__message">필수 입력항목입니다.</div>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
      <v-row>
        <v-col cols="12" class="text-center mt-8">
          <v-btn outlined color="primary" class="mr-5" @click="saveVersionDetail">{{!this.isModify ? '등록' : '수정'}}하기</v-btn>
          <v-btn outlined color="brown lighten-2" @click="goVersionList">목록</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import versionService from 'Api/version/version.service'
import dayjs from 'dayjs'
import VueTimepicker from 'vue2-timepicker/src/vue-timepicker.vue'

const DEFAULT_FORM = {
  VER_NM: null, // 버전명
  VER_CODE: null, // 버전코드
  PRGM_MGMT_NO: null, // 프로그램 관리번호
  PRGM_NM: null, // 프로그램 명
  MOB_TP_CD: 'Android', // 모바일 코드 (Android, IOS)
  DTB_MODE: 'P', // 배포모드(운영,개발)
  FRC_UPD_YN: 'Y', // 강제 업데이트 여부
  UPD_AVL_DTM: null, // 업데이트 가능일시
  VER_REG_DT: null, // 버전 등록일시
  PRGM_LSH_CNTE: null, // 업데이트 상세 내용
  USE_YN: null, // 사용여부
  ADM_SYS_ID: null, // 관리자 시스템 ID
  UPD_URL: null // 업데이트 주소
}

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
  IN_UPD_URL: null // 업데이트 주소
}

export default {
  name: 'VersionWrite',
  components: {
    VueTimepicker
  },
  watch: {
    updAvlDtm (newVal) {
      // 날짜 빈값을 경우 시간 초기화
      if (this.isEmpty(newVal)) {
        this.timeLine.HH = null
        this.timeLine.mm = null
      }
    }
  },
  computed: {
    user () {
      return this.$store.state.user.userInfo
    },
    isModify () {
      return this.versionSeq && this.versionSeq > 0
    }
  },
  data: () => ({
    originForm: _.cloneDeep(DEFAULT_FORM),
    form: _.cloneDeep(DEFAULT_FORM),
    inForm: _.cloneDeep(IN_FORM),
    typeList: [{ code: 'Android', codeNm: 'Android' }, { code: 'Ios', codeNm: 'Ios' }], // 유형
    checkHour: false,
    updAvlDtm: null,
    timeLine: {
      HH: null,
      mm: null
    },
    versionSeq: -1,
    today: dayjs().format('YYYY-MM-DD HH:mm'),
    minDate: dayjs().format('YYYY-MM-DD')
  }),
  mounted () {
    // 수정
    if (this.$route.params && this.$route.params.versionSeq) {
      this.versionSeq = this.$route.params.versionSeq
      this.getVersionDetail(this.versionSeq)
    }
  },
  methods: {
    // 버전관리 목록
    goVersionList () {
      this.$router.push({ path: '/version/list', name: 'versionList', params: { item: this.$route.params.q } })
    },
    // 버전관리 상세조회
    getVersionDetail (versionSeq) {
      const param = { IN_ADM_SYS_ID: this.user.ADM_SYS_ID, IN_VER_ID: versionSeq }
      versionService.getVersionDetail(param).then((response) => {
        if (response.data && response.data.length > 0) {
          this.form = response.data[0]
          // 원본 데이터 setting
          this.originForm = _.cloneDeep(this.form)
          this.minDate = this.form.UPD_AVL_DTM.split(' ')[0]
          // 업데이트 가능일시 set
          const updDate = this.form.UPD_AVL_DTM
          if (!this.isEmpty(updDate) && updDate.length > 10) {
            const dateArr = updDate.split(' ')
            this.updAvlDtm = dateArr[0]
            this.timeLine.HH = dateArr[1].substr(0, 2)
            this.timeLine.mm = dateArr[1].substr(3, 2)
          }
        }
      })
    },
    // 버전관리 저장
    async saveVersionDetail () {
      this.validForm(this.$refs.form).then(async () => {
        if (!this.isEmpty(this.updAvlDtm)) {
          if (this.isEmpty(this.timeLine.HH) || this.isEmpty(this.timeLine.mm)) {
            this.checkHour = true
            return
          }
        } else {
          this.checkHour = false
        }

        /*
          원본 데이터와 저장하려는 데이터의 유형이나 버전 코드, 배포 모드가 바뀐 경우
          exist check validation
        */
        if (Number(this.originForm.VER_CODE) !== Number(this.form.VER_CODE) ||
            this.originForm.MOB_TP_CD !== this.form.MOB_TP_CD ||
            this.originForm.DTB_MODE !== this.form.DTB_MODE) {
          const versionExistParam = {
            IN_ADM_SYS_ID: this.user.ADM_SYS_ID,
            IN_VER_CODE: this.form.VER_CODE,
            IN_MOB_TP_CD: this.form.MOB_TP_CD,
            IN_DTB_MODE: this.form.DTB_MODE
          }
          const versionExistResponse = await versionService.checkExistVersion(versionExistParam)
          if (versionExistResponse && versionExistResponse.data && versionExistResponse.data[0].EXIST_YN === 'Y') {
            this.$dialog.alert('이미 등록된 버전 정보가 있습니다.<br />유형과 버전 코드, 배포 모드를 확인해주세요.')
            return
          }
        }

        // 등록, 수정시 param 'IN_' 붙여야함
        this.setParamIn()
        let saveResponse
        this.$dialog.confirm((this.isModify ? '등록한 버전을 수정' : (this.form.VER_NM + ' 버전을 등록')) + ' 하시겠습니까?').then(async () => {
          if (this.isModify) {
            saveResponse = await versionService.modifyVersion(this.inForm)
          } else {
            saveResponse = await versionService.writeVersion(this.inForm)
          }
          if (saveResponse && saveResponse.data && saveResponse.data[0].ROW_COUNT > 0) {
            this.$dialog.alert((this.isModify ? '수정' : '저장') + ' 되었습니다.').then(() => {
              this.$router.push({ path: '/version/list' })
            })
          } else {
            this.$dialog.alert('저장 중 오류가 발생했습니다.')
          }
        })
      })
    },
    // 저장, 수정시 param 명 변경
    setParamIn () {
      // 업데이트 가능일시
      if (!this.isEmpty(this.updAvlDtm)) {
        this.form.UPD_AVL_DTM = ''
        this.form.UPD_AVL_DTM = this.updAvlDtm + this.timeLine.HH + this.timeLine.mm + '00'
      }
      Object.keys(this.form).forEach(key => {
        if (_.has(this.inForm, 'IN_' + key)) {
          this.inForm['IN_' + key] = this.form[key]
        }
      })
      this.inForm.IN_ADM_SYS_ID = this.user.ADM_SYS_ID
      // 수정시
      if (this.isModify) {
        this.inForm.IN_VER_ID = this.versionSeq
        this.inForm.IN_SAVE_TYP = 'U'
      } else {
        // 등록시
        this.inForm.IN_USE_YN = 'Y'
      }
    }
  }
}
</script>
