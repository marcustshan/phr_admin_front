<template>
  <div class="content-container">
    <v-row class="pt-12 pl-5" dense no-gutters>
      <v-col cols="12">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h4 blue-grey--text">
              나의건강기록 관리자시스템에 오신 것을 환영합니다.
            </v-list-item-title>
            <v-list-item-subtitle class="pt-5 pl-1 text-h6">
              나의 건강기록 APP 전용 관리자시스템을 통해서<br>
              효율적인 앱 관리를 할 수 있습니다.
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-col>
    </v-row>
    <v-row class="mt-12" dense no-gutters>
      <v-col cols="12" class="text-center">
        <img src="@/assets/img/main_img.png" alt="MAIN" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'Main'
}
</script>
