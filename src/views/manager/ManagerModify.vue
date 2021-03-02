<template>
  <div class="content-container">
    <v-row>
      <v-col md="4" cols="2" class="font-weight-bold">
        <v-icon left color="#43425d">label</v-icon>
        <v-label>관리자 계정 수정</v-label>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="12">
        <v-simple-table>
          <caption>마이페이지 정보</caption>
          <thead class="detailTable">
          <tr>
            <th class="text-center" scope="col">계정종류</th>
            <td>
              <label for="selectDobDt" class="no-display">유형선택</label>
              <v-select
                id="selectDobDt"
                class="pt-0 select-adm-dob-dt"
                v-model="modifyForm.IN_ADM_DOB_DT"
                :items="indList"
                hide-details
                item-text="codeNm"
                item-value="code"
              ></v-select>
            </td>
          </tr>
          <tr>
            <th class="text-center" scope="col">이름</th>
            <td>{{ managerInfo.ADM_NM }}</td>
          </tr>
          <tr>
            <th class="text-center" scope="col">아이디</th>
            <td>{{ managerInfo.ADM_ID }}</td>
          </tr>
          <tr>
            <th class="text-center" scope="col">이메일</th>
            <td class="pt-2">
              {{ managerInfo.ADM_EML }}
            </td>
          </tr>
          </thead>
        </v-simple-table>
      </v-col>
    </v-row>
    <v-row class="mt-5">
      <v-col cols="12" class="text-center">
        <v-btn outlined color="primary" class="mr-5" @click="modifyUserInfo">계정변경</v-btn>
        <v-btn outlined color="brown lighten-2" @click="goManagerList">목록</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import managerService from 'Api/manager/manager.service'

export default {
  name: 'ManagerModify',
  computed: {
    user () {
      return this.$store.state.user.userInfo
    }
  },
  data: () => ({
    managerInfo: {},
    modifyForm: {},
    indList: [
      { code: '0', codeNm: '일반관리자' },
      { code: '1', codeNm: '마스터관리자' }
    ]
  }),
  created () {
    if (this.$route.params) {
      this.managerInfo.ADM_SYS_ID = this.$route.params.ADM_SYS_ID
      this.managerInfo.ADM_NM = this.$route.params.ADM_NM
      this.managerInfo.ADM_ID = this.$route.params.ADM_ID
      this.managerInfo.ADM_EML = this.$route.params.ADM_EML
      this.managerInfo.ADM_DOB_DT = this.$route.params.ADM_DOB_DT

      this.modifyForm.IN_ADM_SYS_ID = this.user.ADM_SYS_ID
      this.modifyForm.IN_TARGET_ADM_ID = this.$route.params.ADM_SYS_ID
      this.modifyForm.IN_ADM_DOB_DT = this.$route.params.ADM_DOB_DT

      this.$forceUpdate()
    }
  },
  mounted () {
  },
  methods: {
    // 관리자 계정 목록
    goManagerList () {
      this.$router.push({ path: '/manager/list' })
    },
    // 정보변경
    modifyUserInfo () {
      console.log(this.modifyForm)
      this.$dialog.confirm('정보를 변경하시겠습니까?').then(() => {
        managerService.modifyManagerAccountType(this.modifyForm).then(() => {
          this.$dialog.alert('변경 되었습니다.').then(() => {
            this.$router.push({ path: '/manager/list' })
          })
        })
      })
    }
  }
}
</script>

<style scoped>
.select-adm-dob-dt { width: 300px; }
</style>
