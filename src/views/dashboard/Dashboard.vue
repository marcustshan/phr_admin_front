<template>
  <div class="content-container">
    <div class="stat-title-container">
      <img src="@/assets/img/ico_dashboard_title.png" alt="운영현황" />
      운영현황
    </div>
    <v-card
      v-for="(item, itemIndex) in statDataList"
      :key="`stat_${itemIndex}`"
      class="mx-auto d-inline-block stat-data-item"
      width="390"
      height="130"
    >
      <v-list-item three-line>
        <v-list-item-content>
          <div class="mt-1 title">
            {{ item.title }}
          </div>
          <v-list-item-title class="display-1 text-right">
            {{ statData[`${item.dataKey}_ALL`] | comma }}&nbsp;{{ item.unit }}
          </v-list-item-title>
          <v-list-item-title class="title text-right">
            (어제 : {{ statData[`${item.dataKey}_YESTERDAY`] | comma }}&nbsp;{{ item.unit }}
              &nbsp;/&nbsp;
              오늘 : {{ statData[`${item.dataKey}_TODAY`] | comma }}&nbsp;{{ item.unit }})
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-card>

    <div class="stat-title-container other">
      <img src="@/assets/img/ico_dashboard_title.png" alt="데이터 활용 동의 건수" />
      데이터 활용 동의 건수
    </div>
    <v-card
      v-for="(item, itemIndex) in agreeStatDataList"
      :key="`agree_${itemIndex}`"
      class="mx-auto d-inline-block stat-data-item"
      width="390"
      height="130"
    >
      <v-list-item three-line>
        <v-list-item-content>
          <div class="mt-1 mb-4 title">
            {{ item.title }}
          </div>
          <v-list-item-title class="display-1 mt-3 text-right">
            {{ statData[item.dataKey] | comma }}&nbsp;{{ item.unit }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-card>

    <div class="stat-title-container other">
      <img src="@/assets/img/ico_dashboard_title.png" alt="공유 건수" />
      공유 건수
    </div>
    <v-card
      v-for="(item, itemIndex) in shareStatDataList"
      :key="`share_${itemIndex}`"
      class="mx-auto d-inline-block stat-data-item"
      width="390"
      height="130"
    >
      <v-list-item three-line>
        <v-list-item-content>
          <div class="mt-1 title">
            {{ item.title }}
          </div>
          <v-list-item-title class="display-1 text-right">
            {{ statData[`${item.dataKey}_ALL`] | comma }}&nbsp;{{ item.unit }}
          </v-list-item-title>
          <v-list-item-title class="title text-right">
            (어제 : {{ statData[`${item.dataKey}_YESTERDAY`] | comma }}&nbsp;{{ item.unit }}
              &nbsp;/&nbsp;
              오늘 : {{ statData[`${item.dataKey}_TODAY`] | comma }}&nbsp;{{ item.unit }})
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
import dashboardService from 'Api/dashboard/dashboard.service'

export default {
  name: 'Dashboard',
  computed: {
    user () {
      return this.$store.state.user.userInfo
    }
  },
  data: () => ({
    statDataList: [
      { title: '가입자 수', dataKey: 'CNT_REG', unit: '명' },
      { title: '로그인 사용자 수', dataKey: 'CNT_LOGIN', unit: '명' }
    ],
    agreeStatDataList: [
      { title: '건강보험심사평가원', dataKey: 'CNT_SIMPYUNG', unit: '건' },
      { title: '건강보험공단', dataKey: 'CNT_GUNBO', unit: '건' },
      { title: '질병관리청', dataKey: 'CNT_JILBYOUNG', unit: '건' }
    ],
    shareStatDataList: [
      { title: '공유 수', dataKey: 'CNT_SHARE', unit: '건' }
    ],
    statData: {}
  }),
  mounted () {
    this.getDailyStatData()
  },
  methods: {
    getDailyStatData () {
      const param = {
        sysId: this.user.ADM_SYS_ID
      }
      dashboardService.getDailyStatData(param).then(response => {
        if (response.data && response.data.length > 0) {
          this.statData = response.data[0]
        }
      })
    }
  }
}
</script>

<style scoped>
.content-container { background-color: #f0f0f7; }
.stat-title-container { font-size: 1.3rem; line-height: 1.4rem; font-weight: 600; margin-bottom: 15px; }
.stat-title-container img { margin-right: 5px; }
.stat-title-container.other { margin-top: 60px; }
.stat-data-item { margin-right: 30px !important; }
</style>
