import $http from './index'

const baseUrl = 'clazz'

export const list = () =>
  $http({
    url: $http.adornUrl(baseUrl + '/list'),
    method: 'get',
    params: $http.adornParams({})
  })

export const management = params =>
  $http({
    url: $http.adornUrl(baseUrl + '/management'),
    method: 'post',
    data: $http.adornData(params)
  })
