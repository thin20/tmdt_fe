import axios from '@/utils/request'
import api from '@/api/index'

export function getListBillByPurchaseType (params) {
  return axios({
    url: api.getListBillByPurchaseType,
    method: 'get',
    params: params
  })
}

export function updateBillStatus (params) {
  return axios({
    url: api.updateBillStatus,
    method: 'put',
    data: params
  })
}

export function productBuyBack (params) {
  return axios({
    url: api.productBuyBack,
    method: 'post',
    data: params
  })
}

export function getListBillSellerByPurchaseType (params) {
  return axios({
    url: api.getListBillSellerByPurchaseType,
    method: 'get',
    params: params
  })
}
