<template>
  <div class="content-container">
    <v-row>
      <v-col md="4" cols="2" class="font-weight-bold">
        <v-icon left color="#43425d">label</v-icon>
        <v-label>정보변경</v-label>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="12">
        <v-simple-table dense>
          <thead class="detailTable">
          <tr>
            <th class="text-center">아이디</th>
            <td>{{ user.ADM_ID }}</td>
          </tr>
          <tr>
            <th class="text-center">계정종류</th>
            <td>{{ user.ADM_DOB_DT === '0' ? '일반' : '마스터' }} 관리자</td>
          </tr>
          <tr>
            <th class="text-center">이메일</th>
            <td class="pt-2">
              <v-text-field v-model="form.IN_ADM_EML" :rules="emptyRules.concat(emailRegex)" dense></v-text-field>
            </td>
          </tr>
          </thead>
        </v-simple-table>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="text-right">
        <v-btn color="#43425d" dark @click="pwInput = !pwInput">
          비밀번호 변경
        </v-btn>
      </v-col>
    </v-row>
    <div class="inputForm" v-if="pwInput">
      <v-row>
        <v-col sm="2" align-self="center" class="font-weight-bold">
          <v-label><v-icon left>keyboard_arrow_right</v-icon>새 비빌번호</v-label>
        </v-col>
        <v-col sm="3" class="pb-0">
          <v-text-field v-model="password" label="새 비밀번호를 입력해주세요." type="password" @input="checkPw" @keydown="checkCapsLock" clearable></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col sm="2" align-self="center" class="font-weight-bold">
          <v-label><v-icon left>keyboard_arrow_right</v-icon>새 비빌번호 확인</v-label>
        </v-col>
        <v-col sm="3" class="pb-0">
          <v-text-field v-model="rePassword" label="새 비밀번호를 입력해주세요." type="password" @input="checkPw" @keydown="checkCapsLock" clearable></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col sm="10">
          <small v-if="capsLock" class="orange--text font-weight-bold"><v-icon left>warning</v-icon>Caps Lock 키가 활성화 되었습니다.<br></small>
          <small class="ml-5 red--text" v-if="errMsg">{{ errMsg }}</small>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="blue-grey--text">
                <v-icon left size="23">error_outline</v-icon>비밀 번호 안내
              </v-list-item-title>
              <v-list-item-subtitle class="mt-2 ml-1">
                <v-icon left small>arrow_right</v-icon>
                비밀번호는 10자리 이상의 영문과 숫자, 특수문자 조합으로 입력해주세요
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
    </div>
    <v-row class="mt-5">
      <v-col cols="12" class="text-center">
        <v-btn color="#43425d" dark @click="changMypage">
          변경하기
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import userService from 'Api/user/user.service'

export default {
  name: 'MypageDetail',
  computed: {
    user () {
      return this.$store.state.user.userInfo
    }
  },
  data: () => ({
    pwInput: false,
    capsLock: false,
    errMsg: null,
    passYn: false,
    password: null,
    rePassword: null,
    form: {
      IN_ADM_ID: null,
      IN_ADM_PW: null,
      IN_ADM_EML: null
    }
  }),
  mounted () {
    if (this.user) {
      this.form.IN_ADM_ID = this.user.ADM_ID
      this.form.IN_ADM_EML = this.user.ADM_EML
    }
  },
  methods: {
    // Capslock Check
    checkCapsLock (e) {
      this.capsLock = e.getModifierState('CapsLock')
    },
    // 비밀번호 변경 버튼
    changMypage () {
      if (this.pwInput) {
        if ((this.isEmpty(this.password) || this.isEmpty(this.rePassword))) {
          this.errMsg = '새 비밀번호를 입력해주세요.'
        } else if (this.passYn) {
          this.modifyUserInfo()
        }
      } else {
        this.modifyUserInfo()
      }
    },
    // 정보변경
    modifyUserInfo () {
      this.$dialog.confirm('정보를 변경하시겠습니까?').then(() => {
        userService.modifyUserInfo(this.form).then(() => {
          this.$dialog.alert('변경 되었습니다.').then(() => {
            this.$router.push({ path: '/mypage/check' })
          })
        })
      })
    },
    // 패스워드 유효성 검사
    checkPw () {
      this.errMsg = null
      this.passYn = false
      // 10자리 이상 숫자, 영문, 특수문자
      const pattern = new RegExp('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{10,}$')
      if (!pattern.test(this.password)) {
        this.errMsg = '비밀번호는 10자리 이상의 영문과 숫자, 특수문자 조합으로 등록 가능합니다.'
      } else if (!this.isEmpty(this.rePassword) && (this.password !== this.rePassword)) {
        this.errMsg = '현재 비밀번호가 불일치 합니다.'
      } else if (this.isEmpty(this.rePassword)) {
        this.errMsg = '새 비밀번호를 입력해주세요.'
      } else {
        this.passYn = true
        this.form.IN_ADM_PW = this.rePassword
      }
    }
  }
}
</script>
