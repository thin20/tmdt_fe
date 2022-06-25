import axios from '@/utils/request'
import api from '@/api/index'

export function getRevenueByDate (params) {
  return axios({
    url: api.getRevenueByDate,
    method: 'get',
    params: params
  })
}

export function getDataSalesDashboard (params) {
  return axios({
    url: api.getDataSalesDashboard,
    method: 'get',
    params: params
  })
}

export function getDataSellNumbersDashboard (params) {
  return axios({
    url: api.getDataSellNumbersDashboard,
    method: 'get',
    params: params
  })
}

export function getListTopVisitProduct () {
  return axios({
    url: api.getListTopVisitProduct,
    method: 'get'
  })
}
