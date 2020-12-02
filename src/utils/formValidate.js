// 手机号验证
export function isvalidPhone(str) {
  const reg = /^1[3|4|5|7|8|9][0-9]\d{8}$/
  return reg.test(str)
}

export function isValidEmail(email) {
  const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  return reg.test(email)
}

export function isvalidCharAndNum(str, min, max) {
  const reg = new RegExp(
    '^(?![^a-zA-Z]+$)(?!\\D+$).{' + min + ',' + max + '}$',
    'gi'
  )
  return reg.test(str)
}

export function isvalidCharOrNum(str, min, max) {
  const reg = new RegExp('^([A-Za-z0-9]+){' + min + ',' + max + '}$', 'gi')
  return reg.test(str)
}

export function isvalidCharOrNumOr_(str, min, max) {
  const reg = new RegExp('^([A-Za-z0-9_]+){' + min + ',' + max + '}$', 'gi')
  return reg.test(str)
}

export function validPhone(rule, value, callback) {
  if (!value) {
    callback(new Error('请输入手机号码'))
  } else if (!isvalidPhone(value)) {
    callback(new Error('请输入正确的11位手机号码'))
  } else {
    callback()
  }
}

export function validPassword(rule, value, callback) {
  if (!value) {
    callback(new Error('请输入密码'))
  } else if (!isvalidCharAndNum(value, 9, 16)) {
    callback(new Error('请输入包括数字和字母、长度9到16位的密码组合'))
  } else {
    callback()
  }
}

export function validEmail(rule, value, callback) {
  if (!value) {
    callback(new Error('请输入电子邮箱'))
  } else if (!isValidEmail(value)) {
    callback(new Error('请输入正确的电子邮箱'))
  } else {
    callback()
  }
}
