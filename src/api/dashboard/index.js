import axios from '@/utils/request'
import api from '@/api/index'

export function getRevenueByDate (params) {
  return axios({
    url: api.getRevenueByDate,
    method: 'get',
    params: params
  })
}
