import request from '@/utils/request'

export function query({ limit, page, name, classId }) {
  return request({
    url: '/product/selectProductList',
    method: 'post',
    data: {
      pageSize: limit,
      currentPage: page,
      name,
      classId
    }
  })
}

export function insert(
  { pic, name, classId, price, storage, manufacturerCon, proNumber, shelfLife, series, provinces, factoryName, netContent,
    storeMethod, brand, model, color, ingredients, introduce }) {
  return request({
    url: '/product/addProduct',
    method: 'post',
    data: {
      pic, name, classId, price, storage, manufacturerCon, proNumber, shelfLife, series, provinces, factoryName, netContent,
      storeMethod, brand, model, color, ingredients, introduce
    }
  })
}

export function queryById(id) {
  return request({
    url: '/product/selectProduct',
    method: 'get',
    params: {
      productId: id
    }
  })
}

export function update(
  { id, pic, name, classId, price, storage, manufacturerCon, proNumber, shelfLife, series, provinces, factoryName, netContent,
    storeMethod, brand, model, color, ingredients, introduce }) {
  return request({
    url: '/product/updateProduct',
    method: 'post',
    data: {
      id, pic, name, classId, price, storage, manufacturerCon, proNumber, shelfLife, series, provinces, factoryName, netContent,
      storeMethod, brand, model, color, ingredients, introduce
    }
  })
}

export function deleteById(id) {
  return request({
    url: '/product/deletedProduct',
    method: 'delete',
    params: {
      productId: id
    }
  })
}

export function images(pic) {
  return request({
    url: '/product/images',
    method: 'post',
    data: {
      base64: pic
    }
  })
}

// export function query({ limit, page, name }) {
//   return request({
//     url: '/books/class/list',
//     method: 'post',
//     data: {
//       limit,
//       page,
//       name
//     }
//   })
// }

// export function insert({ name, shortIntroduce, longIntroduce, marketTime, model, classId, image, company, video }) {
//   return request({
//     url: '/products',
//     method: 'post',
//     data: {
//       name,
//       shortIntroduce,
//       longIntroduce,
//       marketTime,
//       model,
//       image,
//       company,
//       classId: classId || '1',
//       video
//     }
//   })
// }

