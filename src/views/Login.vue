<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex class="login-form text-xs-center">
        <div class="display-1 mb-3 text-center subtitle-1 font-weight-bold">
          <img class="phr_icon" src="@/assets/img/phr_icon.png" />
          <br>
          나의건강기록
        </div>
        <v-card light="light">
          <v-card-title class="login_form_title justify-center white--text">
            관리자 시스템
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                id="id"
                v-model="user.id"
                light="light"
                prepend-icon="person"
                label="아이디"
                type="text"
              ></v-text-field>
              <v-text-field
                id="password"
                v-model="user.password"
                light="light"
                prepend-icon="lock"
                label="비밀번호"
                type="password"
              ></v-text-field>
              <v-checkbox
                v-model="user.rememberId"
                light="light"
                label="아이디 저장"
                hide-details="hide-details"
              ></v-checkbox>
              <v-btn
                class="mt-5 login_button white--text"
                @click.prevent="fnLogin"
                block="block"
                type="submit"
                >로그인</v-btn
              >
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
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
      password: '',
      rememberId: false
    },
    loginSucceed: false
  }),
  methods: {
    fnLogin () {
      /*
      this.$axios.post('/login', this.user).then(response => {
        if (response.data.code === '0') {
          this.$store.dispatch('user/setUserInfo', response.data.user)
          if (this.user.rememberId) {
            localStorage.setItem('PHR_REMEMBER_ID', this.user.id)
          } else {
            localStorage.removeItem('PHR_REMEMBER_ID')
          }
        } else {
          this.$dialog.alert(response.data.msg)
        }
      })
      */
      this.loginSucceed = true
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
 img.phr_icon { width: 80px; height: 80px; }
 .login_form_title { background-color: #43425D; }
 .login_button { width: 50% !important; background-color: #43425D !important; }
</style>
