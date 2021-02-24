<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex class="login_form_container text-xs-center">
        <div class="display-1 mb-3 text-center icon_container">
          <img class="phr_icon" src="@/assets/img/logo_phr_big.png" alt="PHR" />
          <br>
          나의건강기록
        </div>
        <v-card-title class="login_form_title justify-center white--text mt-10">
          관리자 시스템
        </v-card-title>
        <v-form class="pa-10 login_form" ref="form">
          <v-text-field
            id="id"
            :rules="idEmptyRules"
            v-model="user.id"
            light="light"
            prepend-icon="person"
            label="아이디"
            type="text"
          ></v-text-field>
          <v-text-field
            id="password"
            class="mt-2"
            :rules="passwordEmptyRules"
            v-model="user.pw"
            light="light"
            prepend-icon="lock"
            label="비밀번호"
            type="password"
          ></v-text-field>
          <div class="red--text justify-center" v-if="statusMsg">
            <span>{{ statusMsg }}</span>
          </div>
          <!--
          <v-checkbox
            v-model="user.rememberId"
            light="light"
            label="아이디 저장"
            hide-details="hide-details"
          ></v-checkbox>
          -->
          <v-btn
            class="mt-8 py-6 login_button white--text"
            @click.prevent="fnLogin"
            depressed
            type="submit"
            >로그인
          </v-btn>
        </v-form>
      </v-flex>

      <v-dialog
        v-model="dialog"
        transition="dialog-top-transition"
        width="500"
      >
        <v-card>
          <v-card-text class="pt-4">
            <v-row dense>
              <v-col cols="8">
                <v-text-field
                  v-model="verificationCode"
                  clearable
                  label="인증번호를 입력하세요."
                  @keypress.enter="submit"
                  :disabled="!sendMsg"
                  maxlength="4"
                ></v-text-field>
              </v-col>
              <v-col cols="4" class="pt-3 pl-5">
                <v-btn x-large min-width="130" max-height="40" @click="sendCode" class="login_button white--text">
                  인증번호 발송
                </v-btn>
              </v-col>
            </v-row>
            <v-row dense v-if="sendMsg">
              <v-col cols="12">
                <div class="red--text">
                  <span><v-icon left size="20">mail_outline</v-icon>가입시 등록한 이메일로 인증번호가 전송되었습니다.</span>
                </div>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions class="justify-center">
            <v-btn large min-width="130" max-height="40" @click="submit" class="login_button white--text" :disabled="!sendMsg">
              인증번호 확인
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Login',
  components: {},
  data: () => ({
    user: {
      id: '',
      pw: '',
      rememberId: false
    },
    dialog: false,
    verificationCode: null,
    sendMsg: false,
    statusMsg: null,
    systemId: null
  }),
  methods: {
    // 로그인 버튼
    async fnLogin () {
      try {
        this.sendMsg = false
        if (!this.$refs.form.validate()) {
          return
        }
        // 1차 로그인 인증
        const res = await this.$store.dispatch('user/preLogin', {
          IN_ADM_ID: this.user.id,
          IN_ADM_PW: this.user.pw
        })
        this.statusMsg = null
        if (res.ERROR_YN === 'Y') {
          if (res.ERROR_MSG === 'NO-MANAGER') {
            this.statusMsg = '등록되지 않은 아이디 입니다.'
          } else if (res.ERROR_MSG === 'DORMANCY') {
            this.$dialog.alert('장기 미 접속 시 로그인 이용이 제한됩니다.<br>관리자 문의 부탁드립니다.')
          } else if (res.ERROR_MSG === 'BLOCK') {
            this.$dialog.alert('로그인 5회 연속 오류로 인하여 로그인이 제한되었습니다.<br>관리자 문의 부탁드립니다.')
          } else if (res.ERROR_MSG === 'WRONG-PWD') {
            this.statusMsg = '로그인 5회 연속 오류 시 로그인이 제한됩니다. (' + res.ERROR_CNT + '/5)'
          }
        } else {
          // 인증번호 dialog
          this.systemId = res.ADM_SYS_ID
          this.dialog = true
        }
      } catch (err) {
        this.$dialog.alert(err.msg)
      }
    },
    // 인증번호 발송
    async sendCode () {
      try {
        this.sendMsg = true
        await this.$store.dispatch('user/emailVerify', {
          certNum: this.systemId
        })
      } catch (err) {
        this.$dialog.alert(err.msg)
      }
    },
    // 인증번호 확인 후 로그인 처리
    async submit () {
      try {
        if (this.verificationCode === null) {
          this.$dialog.alert('인증번호를 입력하세요.')
        } else {
          const res = await this.$store.dispatch('user/login', {
            IN_ADM_ID: this.user.id,
            IN_ADM_PW: this.user.pw,
            IN_CERT_NUM: this.verificationCode
          })
          if ((res !== undefined) && Object.keys(res).length > 0) {
            await this.$router.push({ path: '/main', name: 'main' })
          } else {
            this.$dialog.alert('인증번호가 불일치합니다.')
          }
        }
      } catch (err) {
        this.$dialog.alert(err.msg)
      }
    }
  },
  mounted () {
    const userId = localStorage.getItem('PHR_REMEMBER_ID')
    if (userId && userId.length > 0) {
      this.user.rememberId = true
      this.user.id = userId
      document.getElementById('password').focus()
    } else {
      document.getElementById('id').focus()
    }
  }
}
</script>

<style scoped>
  .icon_container { font-size: 25px !important; color: #000; }
  .login_form_container { max-width: 640px; }
  .login_form { background-color: #fff; text-align: center; }
  .login_form_title { background-color: #43425D; }
  .login_button { width: 50% !important; background-color: #43425D !important; }
</style>
