/* eslint-disable space-before-function-paren */
import dayjs from 'dayjs'

/**
 * replace all
 * @param {*} value
 * @param {*} target
 * @param {*} replaceValue
 */
export function replace(value, target, replaceValue = '') {
  if (!value || value.length < 1) {
    return ''
  }
  return value.split(target).join(replaceValue)
}

/**
 * date -> datePicker 선택값 -> 날짜 str 형태로 변환
 * @param value
 * @param format
 * @returns {string}
 */
export function date(value, format = 'YYYY-MM-DD') {
  if (!value) {
    return ''
  } else if (!dayjs(value).isValid()) {
    return '날짜 형식이 맞지 않습니다.'
  }
  return dayjs(value).format(format)
}

export function dateFormat(value, targetFormat, needFormat) {
  if (!value) {
    return ''
  } else if (!dayjs(value, targetFormat).isValid()) {
    return '날짜 형식이 맞지 않습니다.'
  }
  return dayjs(value, targetFormat).format(needFormat)
}

/**
 * comma -> 숫자 천단위, 콤마 추가
 * @param value
 * @param defaultValue
 * @returns {string}
 */
export function comma(value, defaultValue) {
  if (value === '' || isNaN(value)) {
    return defaultValue || ''
  }
  return Number(value).toLocaleString()
}
