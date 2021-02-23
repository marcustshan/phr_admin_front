<template>
  <div class="content-container">
    <v-form ref="form" lazy-validation>

      <v-row class="pb-3">
        <v-col md="4" cols="2" class="font-weight-bold">
          <v-icon left color="#43425d">label</v-icon>
          <v-label>계정추가</v-label>
        </v-col>
      </v-row>

      <div class="inputForm">

        <v-row>
          <v-col sm="2" align-self="center" class="font-weight-bold">
            <v-label><v-icon left>keyboard_arrow_right</v-icon>계정유형</v-label>
          </v-col>
          <v-col md="3">
            <v-select
              class="pt-0"
              v-model="form.IN_ADM_DOB_DT"
              :items="indList"
              hide-details
              item-text="codeNm"
              item-value="code"
            ></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col sm="2" align-self="center" class="font-weight-bold">
            <v-label><v-icon left>keyboard_arrow_right</v-icon>이름</v-label>
          </v-col>
          <v-col sm="3" class="pb-0">
            <v-text-field v-model="form.IN_ADM_NM" :rules="emptyRules" dense></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col sm="2" align-self="center" class="font-weight-bold">
            <v-label><v-icon left>keyboard_arrow_right</v-icon>ID</v-label>
          </v-col>
          <v-col sm="3" class="pb-0">
            <v-text-field v-model="form.IN_ADM_ID" :rules="emptyRules.concat(idRules)" dense></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col sm="2" align-self="center" class="font-weight-bold">
            <v-label>
              <v-icon left>keyboard_arrow_right</v-icon>이메일</v-label>
          </v-col>
          <v-col sm="3" class="pb-0">
            <v-text-field v-model="form.IN_ADM_EML" :rules="emptyRules.concat(emailRegex)" dense></v-text-field>
          </v-col>
        </v-row>
      </div>

      <v-row v-if="errMsg">
        <v-col sm="10">
          <div class="font-weight-bold red--text">
            <v-icon size="23">new_releases</v-icon>
            {{ errMsg }}
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col sm="10">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="red--text">
                <v-icon left size="23">error_outline</v-icon>계정 추가안내
              </v-list-item-title>
              <v-list-item-subtitle class="mt-2 ml-1">
                <v-icon left small>arrow_right</v-icon>
                비밀번호는 위에 기입하신 이메일로 발송됩니다.
              </v-list-item-subtitle>
              <v-list-item-subtitle class="mt-2 ml-1">
                <v-icon left small>arrow_right</v-icon>
                관리자는 비밀번호를 알 수 없으며, 계정소유자만 알 수 있습니다.
              </v-list-item-subtitle>
              <v-list-item-subtitle class="mt-2 ml-1">
                <v-icon left small>arrow_right</v-icon>
                계정 종류 별로 아이디와 비밀번호를 발급하여 계정을 생성할 수 있습니다.
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" class="text-center">
          <v-btn outlined color="primary" class="mr-5" @click="saveManager">계정추가</v-btn>
          <v-btn outlined color="brown lighten-2" @click="goManagerList">목록</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import managerService from 'Api/manager/manager.service'

const DEFAULT_FORM = {
  IN_ADM_ID: null, // 관리자 ID
  IN_ADM_NM: null, // 관리자 이름
  IN_ADM_DOB_DT: '0', // 관리자 계정종류
  IN_ADM_EML: null // 관리자 이메일
}

export default {
  name: 'ManagerWrite',
  computed: {
    user () {
      return this.$store.state.user.userInfo
    }
  },
  data: () => ({
    isExist: false,
    form: _.cloneDeep(DEFAULT_FORM),
    indList: [{ code: '0', codeNm: '일반관리자' }, { code: '1', codeNm: '마스터관리자' }], // 계정유형
    errMsg: null
  }),
  mounted () {
  },
  methods: {
    // 관리자 계정 목록
    goManagerList () {
      this.$router.push({ path: '/manager/list' })
    },
    // 관리자 계정 저장
    saveManager () {
      this.validForm(this.$refs.form).then(() => {
        this.$dialog.confirm('계정을 추가 하시겠습니까?').then(() => {
          managerService.writeManager(this.form).then(res => {
            if (res.data) {
              const result = res.data[0]
              if (result.ERROR_YN === 'Y') {
                this.errMsg = null
                if (result.ERROR_MSG === 'EXIST_ID') {
                  this.errMsg = '이미 존재하는 계정입니다.'
                } else if (result.ERROR_MSG === 'EXIST_EMAIL') {
                  this.errMsg = '이미 존재하는 이메일입니다.'
                }
              } else {
                this.$dialog.alert('추가 되었습니다.').then(() => {
                  this.$router.push({ path: '/manager/list' })
                })
              }
            }
          })
        })
      })
    }
  }
}
</script>
