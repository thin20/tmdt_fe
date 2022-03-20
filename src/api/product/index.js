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
