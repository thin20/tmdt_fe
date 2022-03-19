import axios from '@/utils/request'
import api from '@/api/index'

export function getListCategory () {
  return axios({
    url: api.getListCategory,
    method: 'get'
  })
}

export function getListCategoryParent () {
  return axios({
    url: api.getListCategoryParent,
    method: 'get'
  })
}
