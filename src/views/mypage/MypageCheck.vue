<template>
  <div class="content-container">
    <v-row>
      <v-col md="4" cols="2">
        <v-icon left color="#43425d">label</v-icon>
        <v-label>비밀번호 확인</v-label>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col md="4" cols="2">
        <v-text-field
          v-model="password"
          :type="showPassword? 'text': 'password'"
          @keydown="checkCapsLock"
          @change="$emit('input', password)"
          label="현재 비밀번호를 입력해주세요."
          clearable
        >
        </v-text-field>
      </v-col>
      <v-col lg="3" md="4" cols="6" class="pl-2">
        <v-checkbox v-model="showPassword" label="입력 보기" hide-details></v-checkbox>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col md="3" cols="1" class="text-left">
        <small v-if="capsLock" class="orange--text font-weight-bold"><v-icon left>warning</v-icon>Caps Lock 키가 활성화 되었습니다.<br></small>
        <small class="red--text" v-if="statusMsg">{{ statusMsg }}</small>
      </v-col>
      <v-col md="1" cols="2" class="text-right">
        <v-btn color="#43425d" dark @click="goDetailMypage">
          다음
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'MypageView',
  data: () => ({
    password: null,
    capsLock: false,
    showPassword: false,
    statusMsg: null
  }),
  computed: {
    user () {
      return this.$store.state.user.userInfo
    }
  },
  methods: {
    async goDetailMypage () {
      try {
        this.statusMsg = null
        if (this.isEmpty(this.password)) {
          this.statusMsg = '패스워드를 입력해주세요.'
        } else {
          // 1차 로그인 인증
          const res = await this.$store.dispatch('user/preLogin', {
            IN_ADM_ID: this.user.ADM_ID,
            IN_ADM_PW: this.password
          })
          if (res.ERROR_YN === 'Y') {
            if (res.ERROR_MSG === 'BLOCK') {
              this.$dialog.alert('패스워드 입력 5회 연속 오류로 인하여 계정이 잠금 설정 되었습니다.<br>관리자 문의 부탁드립니다.').then(() => {
                this.$store.dispatch('user/logout')
              })
            } else if (res.ERROR_MSG === 'WRONG-PWD') {
              this.statusMsg = '패스워드 입력 5회 연속 오류 시 계정이 잠금설정 됩니다. (' + res.ERROR_CNT + '/5)'
            }
          } else {
            await this.$router.push({ path: '/mypage/detail' })
          }
        }
      } catch (err) {
        this.$dialog.alert(err.msg)
      }
    },
    checkCapsLock (e) {
      this.capsLock = e.getModifierState('CapsLock')
    }
  }
}
</script>
