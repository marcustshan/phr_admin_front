<template>
  <div class="content-container">
    <div>
      <v-form lazy-validation>
        <v-row @keypress.enter="getManagerList">
          <v-col cols="3">
            <v-text-field
              v-model="searchParam.q.title"
              append-icon="search"
              clearable
              label="제목"
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
          <v-btn class="ml-3" outlined rounded color="primary" @click="getManagerList">
            <v-icon left>search</v-icon>
            검색
          </v-btn>
        </v-col>
      </v-row>
    </div>

    <v-data-table
      :no-data-text="'검색 결과가 없습니다.'"
      :headers="headers"
      :items="managerList"
      item-key="hisSeq"
      hide-default-footer
      disable-sort
      disable-hover
      class="bordered condensed click-row history-table"
    >
      <template v-slot:item.delete="{ item }">
        <v-btn color="red" outlined dark @click="deleteManager(item.hisSeq)">
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
  name: 'managerList',
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
      { text: 'ID', value: 'id', align: 'center' },
      { text: '이름', value: 'name', align: 'center' },
      { text: '이메일', value: 'email', align: 'center' },
      { text: '비밀번호 초기화', value: 'reset', align: 'center' },
      { text: '장기 미접속', value: 'clear', align: 'center' },
      { text: '계정 삭제', value: 'delete', align: 'center' }
    ],
    managerList: [],
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
    this.getManagerList()
  },
  methods: {
    pageChange (pageNum) {
      if (this.searchParam.page !== pageNum) {
        this.searchParam.page = pageNum
        this.getManagerList()
      }
    },
    clearSearchParam () {
      this.searchParam.q = {}
    },
    resetManager () {
    },
    clearManager () {
    },
    deleteManager (his) {
      console.log(his)
    },
    getManagerList () {
      console.log(this.searchParam.q)
      const tempList = { hisSeq: 1, id: 'master', name: '김길동', email: 'neozen@gmail.com', reset: 'Y', clear: 'Y' }
      this.managerList.push(tempList)
      this.searchParam.total = 1
    }
  }
}
</script>
