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
            :rules="idRules"
            v-model="user.id"
            light="light"
            prepend-icon="person"
            label="아이디"
            type="text"
          ></v-text-field>
          <v-text-field
            id="password"
            class="mt-2"
            :rules="passwordRules"
            v-model="user.password"
            light="light"
            prepend-icon="lock"
            label="비밀번호"
            type="password"
          ></v-text-field>
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
    loginSucceed: false,
    idRules: [
      v => !!v || '아이디를 입력해주세요.'
    ],
    passwordRules: [
      v => !!v || '비밀번호를 입력해주세요.'
    ]
  }),
  methods: {
    fnLogin () {
      if (!this.$refs.form.validate()) {
        return
      }
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
      this.$router.push('/main')
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
