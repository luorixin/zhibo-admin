import { convertType } from '../utils/constant.js'
import moment from 'moment'
import i18n from '../locale'

/**
 * 时间戳转日期字符串
 * @param {time} date
 */
export function toDateFilter(date) {
  return date ? moment(date).format('YYYY-MM-DD') : '尚未填写'
}

function PadZero(str) {
  //补零
  return new RegExp(/^\d$/g).test(str) ? `0${str}` : str
}

/**
 * 秒转是分秒
 * @param {second} 秒
 */
export function toTimeSpanFilter(seconds) {
  if (!parseInt(seconds)) return '00:00:00'
  let durations = moment.duration(seconds, 'seconds')
  return `${PadZero(durations.hours())}:${PadZero(
    durations.minutes()
  )}:${PadZero(durations.seconds())}`
}

/**
 * 日期格式化 yyyymmdd => yyyy-mm-dd
 * @param {日期} date
 */
export function toDateFmt(date, change = '-') {
  const pattern = /(\d{4})(\d{2})(\d{2})/
  return date ? date.replace(pattern, `$1${change}$2${change}$3`) : '尚未填写'
}

export function toTypeConvert(value, constants, key) {
  if (!constants) return value
  let constant = convertType(value, constants)
  key = key ? key : 'text'
  return constant[key] ? constant[key] : value
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter(num) {
  return (+num || 0)
    .toString()
    .replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * 10000 => 10,000.00
 * @param {number} s
 * @param {digit} n
 */
export function toMoneyFilter(s, n) {
  if (typeof s === 'undefined' || s === null) s = 0
  n = n >= 0 && n <= 20 ? n : 2
  // eslint-disable-next-line no-useless-escape
  s = parseFloat((s + '').replace(/[^\d\.-]/g, '')).toFixed(n) + ''
  let l = s.split('.')[0].split('').reverse(),
    r = n > 0 ? '.' + s.split('.')[1] : ''
  let t = '',
    i
  for (i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? ',' : '')
  }
  return t.split('').reverse().join('') + r
}

/**
 * 格式化时间，秒数转换成小时分钟天
 */
export function formatSeconds(s) {
  if (typeof s === 'undefined' || s === null) s = 0
  let oneDay = 60 * 60 * 24
  let oneHour = 60 * 60
  let oneMinute = 60
  let result = parseInt(s)
  if (result > oneDay) {
    result = (result / oneDay).toFixed(2) + ' ' + i18n.t('common.days')
  } else if (result > oneHour) {
    result = (result / oneHour).toFixed(2) + ' ' + i18n.t('common.hours')
  } else if (result > oneMinute) {
    result = (result / oneMinute).toFixed(2) + ' ' + i18n.t('common.minutes')
  } else {
    result = result + ' ' + i18n.t('common.seconds')
  }
  return result
}
