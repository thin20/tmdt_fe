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

export function updateUserInfo (params) {
  return axios({
    method: 'post',
    url: api.updateUserInfo,
    data: params
  })
}

export function changeAvatar (params) {
  return axios({
    method: 'post',
    url: api.changeAvatar,
    data: params
  })
}

export function changePassword (params) {
  return axios({
    method: 'put',
    url: api.changePassword,
    data: params
  })
}

export function getListAddress (params) {
  return axios({
    method: 'get',
    url: api.getListAddress,
    params: params
  })
}

export function createUserAddress (params) {
  return axios({
    method: 'post',
    url: api.createUserAddress,
    data: params
  })
}

export function updateUserAddress (params) {
  return axios({
    method: 'post',
    url: api.updateUserAddress,
    data: params
  })
}

export function deleteUserAddress (params) {
  return axios({
    method: 'delete',
    url: api.deleteUserAddress + '?addressId=' + params.addressId
  })
}

export function setAddressDefault (params) {
  return axios({
    method: 'post',
    url: api.setAddressDefault,
    data: params
  })
}
