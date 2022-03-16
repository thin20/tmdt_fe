import axios from '@/utils/request'
import api from '@/api/index'

export function login (params) {
  return axios({
    method: 'post',
    url: api.login,
    data: params
  })
}

export function register (params) {
  return axios({
    method: 'post',
    url: api.register,
    data: params
  })
}

export function loginByToken (token) {
  return axios({
    method: 'post',
    url: api.loginByToken,
    data: token
  })
}
