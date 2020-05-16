import request from '@/utils/request'

export function page(data) {
  return request({
    url: '/v3/page',
    method: 'post',
    data
  })
}

export function deleted(id) {
  return request({
    url: '/v3/' + id,
    method: 'delete'
  })
}
