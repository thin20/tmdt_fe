import axios from '@/utils/request'
import api from '@/api/index'

export function searchListProduct (params) {
  return axios({
    url: api.searchListProduct,
    method: 'get',
    params: params
  })
}

export function likeProduct (params) {
  return axios({
    url: api.likeProduct,
    method: 'post',
    data: params
  })
}

export function getProductDetail (params) {
  return axios({
    url: api.getProductDetail,
    method: 'get',
    params: params
  })
}

export function searchListProductBySeller (params) {
  return axios({
    url: api.searchListProductBySeller,
    method: 'get',
    params: params
  })
}

export function createProduct (params) {
  return axios({
    url: api.createProduct,
    method: 'post',
    data: params
  })
}

export function updateProduct (params) {
  return axios({
    url: api.updateProduct,
    method: 'post',
    data: params
  })
}

export function changeStatusProduct (params) {
  return axios({
    url: api.changeStatusProduct,
    method: 'put',
    data: params
  })
}
