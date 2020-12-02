import $http from './index'

const baseUrl = ''

/**
 * 登录
 */
export const login = params =>
  $http({
    url: $http.adornUrl(baseUrl + '/login'),
    method: 'post',
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    // },
    data: $http.adornData(params) //, true, 'form')
  })

/**
 * 登出
 */
export const logout = () =>
  $http({
    url: $http.adornUrl(baseUrl + '/logout'),
    method: 'get',
    params: $http.adornParams({})
  })

/**
 * 获取客户
 */
export const getRight = () =>
  $http({
    url: $http.adornUrl(baseUrl + '/ajax/getHeader'),
    method: 'get',
    params: $http.adornParams({})
  })

/**
 * 变更客户
 */
export const changeRight = clientId =>
  $http({
    url: $http.adornUrl(baseUrl + '/ajax/changeClient'),
    method: 'get',
    params: $http.adornParams({
      clientId: clientId
    })
  })
