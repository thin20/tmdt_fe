import Vue from 'vue'
import { loginByToken } from '@/api/user/index'
import _ from 'lodash'

const user = {
  state: {
    token: null,
    isLogin: false,
    info: {
      id: 0,
      firstName: 'Nguyễn Cao',
      lastName: 'Thìn',
      photoURL: 'https://cf.shopee.vn/file/3fc286d5073fbafafdcf616a505672eb',
      numberPhone: '08345345345',
      email: 'shobbebus@gmail.com',
      currentAddress: 'Số 26, ngõ 62, Vân Canh, Hoài Đức, Hà Nội',
      shopName: 'Shop của Thìn'
    },
    userAddress: []
  },
  getters: {
    isLogin: state => state.isLogin,
    userId: state => state.info.id,
    shopName: state => state.info.shopName ?? `${state.info.firstName}`,
    address: state => state.info.userAddress,
    numberPhone: state => state.info.numberPhone,
    username: state => state.info.firstName + ' ' + state.info.lastName,
    firstName: state => state.info.firstName,
    lastName: state => state.info.lastName,
    photoURL: state => state.info.photoURL
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      state.isLogin = true
    },
    SET_INFO: (state, info) => {
      state.info = {
        id: info.id,
        firstName: info.firstName,
        lastName: info.lastName,
        photoURL: info.image,
        numberPhone: info.phoneNumber,
        email: info.email,
        currentAddress: info.currentAddress,
        shopName: info.shobbeName
      }
      state.isLogin = true
    },
    SET_USER_ADDRESS: (state, address) => {
      state.userAddress = _.cloneDeep(address)
    },
    LOGOUT: (state, info) => {
      state.info = {}
      state.token = ''
      state.isLogin = false
      state.userAddress = []
      Vue.$cookies.remove('token')
    },
    RESET_STATE (state) {
      // Merge rather than replace so we don't lose observers
      // https://github.com/vuejs/vuex/issues/1118
      Object.assign(state, user)
    }
  },

  actions: {
    initUser ({ commit }, userInfo) {
      commit('SET_INFO', userInfo)
      commit('SET_TOKEN', userInfo.token)
    },
    logout ({ commit }, userInfo) {
      commit('LOGOUT')
    },
    loginByToken ({ commit, dispatch }) {
      return new Promise((resolve, reject) => {
        const token = Vue.$cookies.get('token')
        if (token) {
          loginByToken(token).then(rs => {
            if (rs) {
              commit('SET_INFO', rs)
              commit('SET_TOKEN', rs.token)
              resolve(rs)
            } else {
              resolve(rs)
            }
          }).catch(error => {
            Vue.$cookies.remove('token')
            dispatch('handleTokenIllegal')
            reject(error)
          })
        } else {
          dispatch('handleTokenIllegal')
          reject(new Error('Không có token!'))
        }
      })
    },
    getUserAddress ({ commit }) {
      // TODO: Call api get list user address
      const userAddress = [
        {
          id: 1,
          city: 'Hà Nội',
          country: 'Việt Nam',
          id_user: 3,
          address: 'Thành phố Phủ Lý',
          district: 'Bắc Ninh',
          ward: 'Tiên du',
          recipientName: 'Thìn',
          recipientNumberPhone: '0123456789',
          isDefault: 1,
          latitude: 21.010163,
          longitude: 105.724724
        },
        {
          id: 2,
          city: 'Hà Nội',
          country: 'Việt Nam',
          id_user: 3,
          address: 'Ngõ 11 Thôn Hạ',
          district: 'Huyện Thanh Oai',
          ward: 'Xã Cự Khê',
          recipientName: 'Nguyễn Cao Thìn',
          recipientNumberPhone: '0123456789',
          isDefault: 0,
          latitude: 20.9111461,
          longitude: 105.7815231
        }
      ]
      commit('SET_USER_ADDRESS', userAddress)
    },
    createUserAddress ({ dispatch }, params) {
      return new Promise((resolve, reject) => {
        // TODO: call api create user address
        resolve(params)
      })
    },
    updateUserAddress ({ dispatch }, params) {
      return new Promise((resolve, reject) => {
        // TODO: call api update user address
        resolve(params)
      })
    },
    removeUserAddress ({ dispatch }, params) {
      return new Promise((resolve, reject) => {
        // TODO: call api remove user address
        resolve(params)
      })
    },
    updateUserAddressDefault ({ dispatch }, params) {
      return new Promise((resolve, reject) => {
        // TODO: call api set user address detail
      })
    },
    resetUserState ({ commit }) {
      commit('RESET_STATE')
    },
    handleTokenIllegal ({ commit, dispatch }) {
      // TODO: reset state cart
      dispatch('resetUserState')
    }
  }
}

export default user
