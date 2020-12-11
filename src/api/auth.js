import $http from './index'

const baseUrl = 'user'

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
 * 新增
 */
export const add = params =>
  $http({
    url: $http.adornUrl(baseUrl + '/add'),
    method: 'post',
    data: $http.adornData(params)
  })

/**
 * 删除
 */
export const del = params =>
  $http({
    url: $http.adornUrl(baseUrl + '/delete'),
    method: 'delete',
    data: $http.adornParams(params)
  })
