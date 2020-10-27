<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex class="login-form text-xs-center">
        <div class="display-1 mb-3 text-center">
          <v-icon class="mr-2" large="large">work</v-icon> PHR Admin
        </div>
        <v-card light="light">
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="user.id"
                light="light"
                prepend-icon="person"
                label="아이디"
                type="text"
              ></v-text-field>
              <v-text-field
                v-model="user.password"
                light="light"
                prepend-icon="lock"
                label="비밀번호"
                type="password"
              ></v-text-field>
              <v-checkbox
                v-model="user.rememberId"
                light="light"
                label="아이디 기억"
                hide-details="hide-details"
              ></v-checkbox>
              <v-btn
                class="mt-5"
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
    }
  }),
  methods: {
    fnLogin () {
      this.$axios.post('/login', this.user).then((response) => {
        console.log(response)
      })
    }
  }
}
</script>
