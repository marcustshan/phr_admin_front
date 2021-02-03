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
          clearable
        >
        </v-text-field>
      </v-col>
      <v-col lg="3" md="4" cols="6" class="pl-2">
        <v-checkbox v-model="showPassword" label="입력 보기" hide-details></v-checkbox>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col md="2" cols="1" class="text-left">
        <small v-if="capsLock" class="orange--text font-weight-bold"><v-icon left>warning</v-icon>Caps Lock 키가 활성화 되었습니다.</small>
      </v-col>
      <v-col md="2" cols="2" class="text-right">
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
    showPassword: false
  }),
  created () {
  },
  methods: {
    goDetailMypage () {
      this.$router.push({ path: '/mypage/detail' })
    },
    checkCapsLock (e) {
      this.capsLock = e.getModifierState('CapsLock')
    }
  }
}
</script>
