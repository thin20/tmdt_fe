import { getListBillBySellerInCart, updateQuantityProductInCart, deleteProductInCart } from '@/api/cart/index'
import store from '@/store/index'

const cart = {
  state: {
    listBillBySeller: [],
    listProductInCart: []
  },
  mutations: {
    SET_LIST_BILL_BY_SELLER: (state, listBillBySeller) => {
      state.listBillBySeller = listBillBySeller
    },
    SET_LIST_PRODUCT_IN_CART: (state, listProductInCart) => {
      state.listProductInCart = listProductInCart
    }
  },
  getters: {
    listBillBySeller (state) {
      return state.listBillBySeller
    },
    listProductInCart (state) {
      return state.listProductInCart
    }
  },
  actions: {
    GetListBillBySeller: ({ commit, dispatch }) => {
      return new Promise((resolve, reject) => {
        if (store.getters.isLogin) {
          getListBillBySellerInCart().then(rs => {
            dispatch('SetListBillBySeller', rs)
            dispatch('SetListProductInCart')
            resolve(rs)
          }).catch(err => {
            reject(err)
          })
        }
      })
    },
    SetListBillBySeller: ({ commit }, newList) => {
      commit('SET_LIST_BILL_BY_SELLER', newList)
    },
    ChangeQuantityProductInCart: ({ dispatch, state }, params) => {
      return new Promise((resolve, reject) => {
        updateQuantityProductInCart(params).then(rs => {
          if (rs) {
            dispatch('GetListBillBySeller')
            resolve(true)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    RemoveProductInCart: ({ dispatch, state }, billId) => {
      return new Promise((resolve, reject) => {
        const params = {
          billId: billId
        }
        deleteProductInCart(params).then(rs => {
          if (rs) {
            resolve(true)
            dispatch('GetListBillBySeller')
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    RemoveProductsInCart: ({ dispatch, state }, listBillId) => {
      return new Promise((resolve, reject) => {
        resolve(listBillId)
      })
    },
    BuyProductsInCart: ({ dispatch, state }, listBillId) => {
      // TODO call api buy list product in cart
      return new Promise((resolve, reject) => {
        console.log('list billIds buy: ', listBillId)
        resolve(listBillId)
      })
    },
    GetListProductInCart: ({ state }) => {
      return state.listProductInCart
    },
    SetListProductInCart: ({ commit, state }) => {
      const newList = []
      state.listBillBySeller.forEach(item => {
        item.bills.forEach(bill => {
          const productInfo = {}
          productInfo.billId = bill.billId
          productInfo.quantity = bill.quantity
          productInfo.product = { ...bill.product }
          newList.push(productInfo)
        })
      })
      commit('SET_LIST_PRODUCT_IN_CART', newList)
    }
  }
}

export default cart
