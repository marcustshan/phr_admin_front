<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex class="login-form text-xs-center">
        <div class="display-1 mb-3">
          <v-icon class="mr-2" large="large">work</v-icon> MyWorkspace
        </div>
        <v-card light="light">
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="user.id"
                light="light"
                prepend-icon="person"
                label="ID"
                type="text"
              ></v-text-field>
              <v-text-field
                v-model="user.password"
                light="light"
                prepend-icon="lock"
                label="Password"
                type="password"
              ></v-text-field>
              <v-checkbox
                v-model="options.rememberId"
                light="light"
                label="Stay logged in?"
                hide-details="hide-details"
              ></v-checkbox>
              <v-btn
                @click.prevent=""
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
      password: ''
    },
    options: {
      rememberId: false
    }
  })
}
</script>
