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