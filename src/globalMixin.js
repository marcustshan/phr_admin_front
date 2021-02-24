const globalMixin = {
  data () {
    return {
      emptyRules: [
        v => !!v || '필수 입력항목입니다.',
        v => (!v || v.length !== 0) || '필수 선택항목입니다.'
      ],
      emptyText: '검색 결과가 없습니다.',
      searchLabel: '전체 검색',
      nameRegex: [
        v => (!v || /^[A-Za-z0-9가-힝\s-_():&![\],.%+~@*^'/?²℃※<>]+$/g.test(v)) || '한글, 영문, 숫자, 특수문자(-_():&![],.%+~@*^\'/?²℃※<>)만 입력가능합니다.'
      ],
      oneOrMoreRegex: [
        v => (!v || /^[1-9]{1}[0-9]*$/g.test(v)) || '1 이상의 숫자를 입력해주세요.'
      ],
      emailRegex: [
        v => (!v || (v && /^[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(v))) || '메일 형식이 올바르지 않습니다.'
      ],
      phoneRegex: [
        v => (!v || /^0\d{1,2}-\d{3,4}-\d{4}$/.test(v)) || '전화번호 형식이 올바르지 않습니다.'
      ],
      mobileRegex: [
        v => (!v || /(01[016789])[-](\d{4}|\d{3})[-]\d{4}$/.test(v)) || '휴대폰 번호 형식이 올바르지 않습니다.'
      ],
      numberRules: [
        v => (!v || /^[0-9\\,]+$/.test(v)) || '숫자만 입력 가능합니다.'
      ],
      versionRules: [
        v => (!v || /^[0-9\\.]+$/.test(v)) || '숫자만 입력 가능합니다.'
      ],
      siteRules: [
        v => (!v || /^[0-9a-zA-Z\\.]+$/.test(v)) || '영문, 숫자만 입력 가능합니다.'
      ],
      idRules: [
        v => (!v || /^[0-9a-z\\_-]{5,}$/.test(v)) || '영문(소문자), 숫자, 특수문자(\'-\', \'_\')만 입력 가능합니다. (5글자 이상)'
      ],
      idEmptyRules: [
        v => !!v || '아이디를 입력해주세요.'
      ],
      passwordEmptyRules: [
        v => !!v || '비밀번호를 입력해주세요.'
      ]
    }
  },
  methods: {
    // 검색조건 초기화
    clearSearchParam (param) {
      param.type = 'ALL'
      param.search = null
      param.startDt = null
      param.endDt = null
    },
    isEmpty (value) {
      if (this.trimAll(value) === '' || value === null || value === undefined || (value !== null && typeof value === 'object' && !Object.keys(value).length)) {
        return true
      } else {
        return false
      }
    },
    replaceAll (value, target, to) {
      return !value ? '' : value.split(target).join(to)
    },
    trimAll (value) {
      return !value ? '' : value.split(' ').join('')
    },
    validForm (form) {
      return new Promise((resolve, reject) => {
        if (form && Object.prototype.hasOwnProperty.call(form, 'validate')) {
          if (form.validate()) {
            resolve()
          } else {
            this.$dialog.alert('필수 입력값을 확인해 주세요.').then(() => {
              form.$el.getElementsByClassName('error--text')[0].getElementsByTagName('input')[0].focus()
            })
            // reject(new Error('유효성 검사 오류'))
          }
        } else {
          // reject(new Error('폼 데이터 오류'))
        }
      })
    },
    cloneDeep (origin) {
      return JSON.parse(JSON.stringify(origin))
    },
    maxLengthRules (length) {
      return [
        v => (!v || v.length <= length) || `글자 수가 ${length}자 이내여야 합니다.`
      ]
    },
    betweenLengthRules (minLength, maxLength) {
      return [
        v => (!v || (v.length >= minLength && v.length <= maxLength)) || `글자 수가 최소 ${minLength}자 최대 ${maxLength}자 이내여야 합니다.`
      ]
    }
  },
  computed: {
  }
}

export default globalMixin
