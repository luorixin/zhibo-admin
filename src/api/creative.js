import $http from './index'

const baseUrl = 'creative'

export const list = () =>
  $http({
    url: $http.adornUrl(baseUrl + '/list'),
    method: 'get',
    params: $http.adornParams({})
  })

export const add = params =>
  $http({
    url: $http.adornUrl(baseUrl + '/add'),
    method: 'post',
    data: $http.adornData(params)
  })

export const modify = params =>
  $http({
    url: $http.adornUrl(baseUrl + '/modify'),
    method: 'put',
    data: $http.adornData(params)
  })

export const name = params =>
  $http({
    url: $http.adornUrl(baseUrl + '/name'),
    method: 'post',
    data: $http.adornData(params)
  })
