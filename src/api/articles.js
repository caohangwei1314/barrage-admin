import request from '@/utils/request'

export function listThree(id) {
  return request({
    url: '/articles/listThree?id=' + id,
    method: 'get'
  })
}

export function detail(id) {
  return request({
    url: '/articles/detail?id=' + id,
    method: 'get'
  })
}

export function updateDetail(id) {
  return request({
    url: '/articles/update/detail?id=' + id,
    method: 'get'
  })
}

export function page() {
  return request({
    url: '/articles/listAllForTen',
    method: 'get'
  })
}

export function userArticles() {
  return request({
    url: '/user/articles',
    method: 'post'
  })
}

export function create(data) {
  return request({
    url: '/user/articles/create',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/user/articles/update',
    method: 'post',
    data
  })
}

export function deleted(id) {
  return request({
    url: '/articles/' + id,
    method: 'delete'
  })
}

export function updateStatus(data) {
  return request({
    url: '/articles/update/status',
    method: 'post',
    data
  })
}
