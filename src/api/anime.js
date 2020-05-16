import request from '@/utils/request'

export function page(limit, size, orderColumn, orderDesc) {
  return request({
    url: '/anime/page?limit=' + limit + '&size=' + size + '&orderColumn=' + orderColumn + '&orderDesc=' + orderDesc,
    method: 'get'
  })
}

export function pageSearch(limit, size, orderColumn, orderDesc, searchInfo) {
  return request({
    url: '/anime/search?limit=' + limit + '&size=' + size + '&orderColumn=' + orderColumn + '&orderDesc=' + orderDesc + '&searchInfo=' + searchInfo,
    method: 'get'
  })
}

export function detail(id) {
  return request({
    url: '/anime/detail/' + id,
    method: 'get'
  })
}

export function recentUpdate() {
  return request({
    url: '/anime/series/recent/update',
    method: 'get'
  })
}

export function insert(data) {
  return request({
    url: '/anime/insert',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/anime/update',
    method: 'put',
    data
  })
}

export function deleted(id) {
  return request({
    url: '/anime/' + id,
    method: 'delete'
  })
}
