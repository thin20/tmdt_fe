import axios from '@/utils/request'
import api from '@/api/index'

export function searchListProduct (params) {
  return axios({
    url: api.searchListProduct,
    method: 'get',
    params: params
  })
}
