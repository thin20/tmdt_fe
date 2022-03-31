import axios from '@/utils/request'
import api from '@/api/index'

export function getListBillBySellerInCart () {
  return axios({
    url: api.getListBillBySellerInCart,
    method: 'get'
  })
}

export function addToCart (params) {
  return axios({
    url: api.addToCart,
    method: 'post',
    data: params
  })
}

export function updateQuantityProductInCart (params) {
  return axios({
    url: api.updateQuantityProductInCart,
    method: 'put',
    data: params
  })
}

export function deleteProductInCart ({ billId }) {
  return axios({
    url: api.deleteProductInCart + '?billId=' + billId,
    method: 'delete'
  })
}

export function deleteProductsInCart (params) {
  return axios({
    url: api.deleteProductsInCart,
    method: 'delete',
    data: params
  })
}

export function buyProducts (params) {
  return axios({
    url: api.buyProducts,
    method: 'post',
    data: params
  })
}
