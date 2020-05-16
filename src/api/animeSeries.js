import request from '@/utils/request'

export function page(id, limit, size) {
  return request({
    url: '/anime/series/page?animeId=' + id + '&limit=' + limit + '&size=' + size,
    method: 'get'
  })
}

export function pageSearch(id, limit, size, search) {
  return request({
    url: '/anime/series/search?animeId=' + id + '&limit=' + limit + '&size=' + size + '&search=' + search,
    method: 'get'
  })
}

export function detail(id) {
  return request({
    url: '/anime/series/detail/' + id,
    method: 'get'
  })
}

export function timeLine() {
  return request({
    url: '/anime/series/timeline/',
    method: 'get'
  })
}

export function insert(data) {
  return request({
    url: '/anime/series/insert',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/anime/series/update',
    method: 'put',
    data
  })
}

export function deleted(id) {
  return request({
    url: '/anime/series/' + id,
    method: 'delete'
  })
}
