<template>
  <div class="content-container">
    <div>
      <v-form lazy-validation>
        <v-row @keypress.enter="getVersionList">
          <v-col cols="3">
            <v-text-field
              v-model="searchParam.q.type"
              append-icon="search"
              clearable
              label="유형"
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="searchParam.q.version"
              append-icon="search"
              clearable
              label="버전"
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="searchParam.q.mode"
              append-icon="search"
              clearable
              label="배포모드"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>
      <v-row justify="space-between">
        <v-col cols="4" align-self="center" class="pr-0">
          <div class="black--text">총 {{searchParam.total}} 건 {{searchParam.page}} / {{pages}} 페이지</div>
        </v-col>
        <v-col cols="7" align-self="center" class="text-right pl-0">
          <v-btn outlined rounded color="green" @click="clearSearchParam">
            <v-icon left>refresh</v-icon>
            초기화
          </v-btn>
          <v-btn class="ml-3" outlined rounded color="primary" @click="getVersionList">
            <v-icon left>search</v-icon>
            검색
          </v-btn>
        </v-col>
      </v-row>
    </div>

    <v-data-table
      :no-data-text="'검색 결과가 없습니다.'"
      :headers="headers"
      :items="versionList"
      item-key="hisSeq"
      hide-default-footer
      disable-sort
      disable-hover
      class="bordered condensed click-row history-table"
    >
      <template v-slot:item.modify="{ item }">
        <v-btn small color="accent" rounded outlined @click="modifyFaq(item)">
          <v-icon small>check</v-icon>수정
        </v-btn>
      </template>
      <template v-slot:item.delete="{ item }">
        <v-btn color="red" outlined dark @click="deleteFaq(item.hisSeq)">
          <v-icon left>delete_outline</v-icon>
          삭제
        </v-btn>
      </template>
    </v-data-table>

    <v-pagination
      :value="searchParam.page"
      :total-visible="10"
      :length="pages"
      circle
      class="mt-3"
      @input="pageChange($event)"
    ></v-pagination>
  </div>
</template>

<script>
export default {
  name: 'versionList',
  computed: {
    pages () {
      if (this.searchParam.size == null || this.searchParam.total == null || this.searchParam.total === 0) {
        return 1
      }
      return Math.ceil(this.searchParam.total / this.searchParam.size)
    }
  },
  data: () => ({
    headers: [
      { text: 'No', value: 'hisSeq', align: 'center' },
      { text: '유형', value: 'type', align: 'center' },
      { text: '버전', value: 'version', align: 'center' },
      { text: '배포모드', value: 'mode', align: 'center' },
      { text: '등록일시', value: 'regDate', align: 'center' },
      { text: '수정', value: 'modify', align: 'center' },
      { text: '삭제', value: 'delete', align: 'center' }
    ],
    versionList: [],
    searchParam: {
      q: {
        title: null
      },
      page: 1,
      size: 10,
      total: 0
    }
  }),
  created () {
  },
  mounted () {
    this.getVersionList()
  },
  methods: {
    pageChange (pageNum) {
      if (this.searchParam.page !== pageNum) {
        this.searchParam.page = pageNum
        this.getVersionList()
      }
    },
    clearSearchParam () {
      this.searchParam.q = {}
    },
    modifyFaq () {
    },
    deleteFaq () {
    },
    getVersionList () {
      console.log(this.searchParam.q)
      const tempList = { hisSeq: 1, type: 'Android11', version: '00.01.01', mode: '개발', regDate: '2021-02-02 13:30' }
      this.versionList.push(tempList)
      this.searchParam.total = 1
    }
  }
}
</script>
