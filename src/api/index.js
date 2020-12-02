import axios from 'axios'
import Vue from 'vue'
import router from '@/router'
import Util from '../utils'
import qs from 'qs'
import merge from 'lodash.merge'
import i18n from '../locale'

const baseUrl = process.env.VUE_APP_URL

Vue.prototype.BASE_URL = baseUrl

const http = axios.create({
  timeout: 1000 * 60 * 3,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})

/**
 * 请求拦截
 */
http.interceptors.request.use(
  config => {
    // 检测新版本
    axios
      .get('./version.json?_=' + Math.random())
      .then(response => {
        if (200 == response.status) {
          if (process.env.VUE_APP_VERSION != response.data.version) {
            let message = i18n.t('common.needUpdate')
            let isCheckVersion = window.localStorage.getItem('isCheckVersion')
            if (!isCheckVersion) {
              window.localStorage.setItem('isCheckVersion', true)
              Vue.prototype.$alert(message, i18n.t('common.tip'), {
                confirmButtonText: i18n.t('common.confirm'),
                callback: function () {
                  window.localStorage.removeItem('isCheckVersion')
                  window.location.reload(true)
                }
              })
            } else {
              setTimeout(() => {
                window.localStorage.removeItem('isCheckVersion')
              }, 3000)
            }
          }
        }
      })
      .catch(err => {
        // console.error(err);
      })
    config.headers['Authorization'] =
      'iNsight ' +
      Util.getToken() +
      ';iNsightUser=' +
      Util.getCookie('INSIGHTS_USER') // 请求头带上token
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

/**
 * 响应拦截
 */
http.interceptors.response.use(
  response => {
    const res = response.data
    const httpCode = response.status
    if (httpCode === 200) {
      if (!res.code || res.code === 200) {
        return Promise.resolve(res.data || res)
      } else {
        switch (res.code) {
          // http status handler
          case 2001:
          case 60001:
          case 60003:
          case 60004:
          case 60006:
            if (Util.getToken()) {
              Util.removeToken()
              Util.showMsg(i18n.t('login.error.session'), () => {
                router.push({ name: 'login' })
              })
            }
            break
          default:
            Util.showMsg(
              res.message || res.errorMessage || i18n.t('login.error.system')
            )
        }
        return Promise.reject(res)
      }
    } else {
      // 内部错误码处理
      if (httpCode === 401) {
        if (Util.getToken()) {
          Util.removeToken()
          Util.showMsg(res.message || i18n.t('login.error.permisson'), () => {
            router.push({ name: 'login' })
          })
        }
      } else {
        // 默认的错误提示
        Util.showMsg(res.message || i18n.t('login.error.network'))
      }
      return Promise.reject(res)
    }
  },
  error => {
    if (/timeout\sof\s\d+ms\sexceeded/.test(error.message)) {
      // 超时
      Util.showMsg(i18n.t('login.error.network'))
    }
    if (error.response) {
      // http状态码判断
      switch (error.response.status) {
        // http status handler
        case 401:
          if (Util.getToken()) {
            Util.removeToken()
            Util.showMsg(i18n.t('login.error.session'), () => {
              router.push({ name: 'login' })
            })
          }
          break
        case 404:
          Util.showMsg(i18n.t('login.error.notFound'))
          break
        case 500:
          Util.showMsg(i18n.t('login.error.innerError'))
          break
        case 503:
          Util.showMsg(i18n.t('login.error.notInService'))
          break
        default:
          Util.showMsg(i18n.t('login.error.dataError'))
          break
      }
    }
    return Promise.reject(error.response)
  }
)

/**
 * 请求地址处理
 * @param {*} actionName action方法名称
 */
http.adornUrl = actionName => {
  // 非生产环境 && 开启代理, 接口前缀统一使用[/proxyApi/]前缀做代理拦截!
  return (
    (process.env.NODE_ENV !== 'production' && process.env.OPEN_PROXY
      ? '/proxyApi'
      : baseUrl) + actionName
  )
}

/**
 * get请求参数处理
 * @param {*} params 参数对象
 * @param {*} openDefultParams 是否开启默认参数?
 */
http.adornParams = (params = {}, openDefultParams = true) => {
  var defaults = {
    t: new Date().getTime()
  }
  return openDefultParams ? merge(defaults, params) : params
}

/**
 * post请求数据处理
 * @param {*} data 数据对象
 * @param {*} openDefultdata 是否开启默认数据?
 * @param {*} contentType 数据格式
 *  json: 'application/json; charset=utf-8'
 *  form: 'application/x-www-form-urlencoded; charset=utf-8'
 */
http.adornData = (data = {}, openDefultdata = true, contentType = 'json') => {
  var defaults = {
    t: new Date().getTime()
  }
  // console.log(data)
  data = openDefultdata ? merge(defaults, data) : data
  return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data)
}

export default http
