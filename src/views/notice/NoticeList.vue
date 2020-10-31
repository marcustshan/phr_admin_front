<template>
  <v-container>
    <v-data-table
      :no-data-text="'검색 결과가 없습니다.'"
      :headers="headers"
      :items="noticeList"
      item-key="chgHisSeq"
      hide-default-footer
      disable-sort
      disable-hover
      class="bordered condensed click-row history-table"
    >
    </v-data-table>
  </v-container>
</template>

<script>
import noticeService from 'Api/modules/notice.service'

export default {
  name: 'NoticeList',
  data: () => ({
    headers: [
      { text: '순번', value: 'noticeSeq', align: 'center' },
      { text: '제목', value: 'title', align: 'center' },
      { text: '조회수', value: 'hitCount', align: 'center' },
      { text: '작성자', value: 'writerName', align: 'center' },
      { text: '작성 일시', value: 'createdDate', align: 'center' }
    ],
    noticeList: []
  }),
  created () {
    this.getNoticeList()
  },
  methods: {
    getNoticeList () {
      noticeService.getNoticeList().then(response => {
        console.log(response)
      })
    }
  }
}
</script>
