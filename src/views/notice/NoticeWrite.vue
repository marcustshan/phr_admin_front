<template>
  <div class="content-container">
    <v-form ref="form" v-model="valid" lazy-validation class="mt-10">
      <v-text-field
        v-model="notice.title"
        :rules="emptyRules"
        label="제목"
        required
        :readonly="isModify"
      ></v-text-field>

      <v-textarea
        class="mt-5"
        outlined
        label="내용"
        height="500"
        :rules="emptyRules"
        v-model="notice.content"
      ></v-textarea>

      <v-row>
        <v-col cols="12" class="text-right">
          <v-btn :disabled="!valid" color="gray" class="ml-4" @click="cancel">
            취소
          </v-btn>
          <v-btn :disabled="!valid" color="primary" class="ml-4" @click="saveNoticeDetail">
            저장
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import noticeService from 'Api/modules/notice.service'

export default {
  name: 'NoticeWrite',
  computed: {
    user () {
      return this.$store.state.user.userInfo
    },
    isModify () {
      return this.noticeSeq && this.noticeSeq > 0
    }
  },
  data: () => ({
    valid: true,
    emptyRules: [
      v => v !== undefined || '필수 입력항목입니다.',
      v => v !== null || '필수 입력항목입니다.',
      v => (v && v.length !== 0) || '필수 입력항목입니다.'
    ],
    notice: {
      title: '',
      content: '',
      writerId: '',
      writerName: ''
    },
    noticeSeq: -1
  }),
  created () {
    if (this.$route.params && this.$route.params.noticeSeq) {
      this.noticeSeq = this.$route.params.noticeSeq
      this.getNoticeDetail(this.noticeSeq)
    }
  },
  methods: {
    getNoticeDetail (noticeSeq) {
      noticeService.getNoticeDetail(noticeSeq).then((response) => {
        this.notice = response.data
      })
    },
    saveNoticeDetail () {
      if (!this.$refs.form.validate()) {
        return
      }

      this.$dialog.confirm('저장 하시겠습니까?').then(() => {
        this.notice.writerId = this.user.id
        this.notice.writerName = this.user.name

        if (this.isModify) {
          noticeService.modifyNotice(this.noticeSeq, this.notice).then(response => {
            if (response.data.code === '0') {
              this.$dialog.alert('저장 되었습니다.').then(() => {
                this.$router.push({ path: '/notice/list' })
              })
            } else {
              this.$dialog.alert(response.data.msg)
            }
          })
        } else {
          noticeService.writeNotice(this.notice).then(response => {
            if (response.data.code === '0') {
              this.$dialog.alert('저장 되었습니다.').then(() => {
                this.$router.push({ path: '/notice/list' })
              })
            } else {
              this.$dialog.alert(response.data.msg)
            }
          })
        }
      })
    },
    cancel () {
      this.$router.go(-1)
    }
  }
}
</script>
