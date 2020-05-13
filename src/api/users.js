import request from '@/utils/request'

export function queryById(id) {
  return request({
    url: '/user/selectUser',
    method: 'get',
    params: {
      userId: id
    }
  })
}

export function query({ limit, page }) {
  return request({
    url: '/user/selectUserList',
    method: 'post',
    data: {
      pageSize: limit,
      currentPage: page
    }
  })
}

export function selectUserUploadVideoList() {
  return request({
    url: '/review/user/video/list',
    method: 'get'
  })
}

export function selectUserArticlesList() {
  return request({
    url: '/review/user/articles/list',
    method: 'get'
  })
}
// export function insert({ uniqueId, classId, name, password, img, balance }) {
//   return request({
//     url: '/users/register',
//     method: 'post',
//     data: {
//       uniqueId, classId: classId || null, name, password, img, balance
//     }
//   })
// }

export function update({ id, name, email, address, balance }) {
  return request({
    url: '/user/updateUser',
    method: 'post',
    data: {
      id, name, email, address, balance
    }
  })
}

export function deleteById(id) {
  return request({
    url: '/users',
    method: 'delete',
    params: {
      id
    }
  })
}
