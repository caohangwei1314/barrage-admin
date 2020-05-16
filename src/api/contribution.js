import request from '@/utils/request'

export function page() {
  return request({
    url: '/contribution/page',
    method: 'post'
  })
}

export function userList() {
  return request({
    url: '/contribution/user/list',
    method: 'post'
  })
}

export function detail(id) {
  return request({
    url: '/contribution/detail/' + id,
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: '/contribution',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/contribution',
    method: 'put',
    data
  })
}

export function deleted(id) {
  return request({
    url: '/contribution/' + id,
    method: 'delete'
  })
}
