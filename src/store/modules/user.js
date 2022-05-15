import Vue from 'vue'
import {
  loginByToken,
  updateUserInfo,
  changePassword,
  changeAvatar,
  getListAddress,
  createUserAddress,
  updateUserAddress,
  deleteUserAddress,
  setAddressDefault
} from '@/api/user/index'

const user = {
  state: {
    token: null,
    isLogin: false,
    info: {
      id: 0,
      firstName: '',
      lastName: '',
      image: '',
      phoneNumber: '',
      email: '',
      currentAddress: '',
      shobbeName: ''
    },
    userAddress: []
  },
  getters: {
    isLogin: state => state.isLogin,
    userId: state => state.info.id,
    shobbeName: state => state.info.shobbeName ?? `${state.info.firstName} ${state.info.lastName}`,
    address: state => state.info.userAddress,
    phoneNumber: state => state.info.phoneNumber,
    email: state => state.info.email,
    username: state => state.info.firstName + ' ' + state.info.lastName,
    firstName: state => state.info.firstName,
    lastName: state => state.info.lastName,
    image: state => state.info.image,
    token: state => state.token,
    userAddress: state => state.userAddress
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
        image: info.image,
        phoneNumber: info.phoneNumber,
        email: info.email,
        currentAddress: info.currentAddress,
        shobbeName: info.shobbeName
      }
      state.isLogin = true
    },
    SET_USER_ADDRESS: (state, address) => {
      state.userAddress = address
    },
    SET_USER_AVATAR: (state, avatar) => {
      state.info.image = avatar
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
    updateUserInfo ({ dispatch }, params) {
      return new Promise((resolve, reject) => {
        updateUserInfo(params).then(rs => {
          if (rs) {
            dispatch('loginByToken')
            resolve(rs)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    changeAvatar ({ commit }, params) {
      return new Promise((resolve, reject) => {
        changeAvatar(params).then(rs => {
          if (rs) {
            commit('SET_USER_AVATAR', params.imagePath)
            resolve(rs)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    changePassword ({ dispatch }, params) {
      return new Promise((resolve, reject) => {
        changePassword(params).then(rs => {
          if (rs) {
            dispatch('logout')
            resolve(rs)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    getUserAddress ({ commit }) {
      getListAddress().then(rs => {
        if (rs) {
          commit('SET_USER_ADDRESS', rs)
        }
      }).catch(() => {

      })
    },
    createUserAddress ({ dispatch }, params) {
      return new Promise((resolve, reject) => {
        createUserAddress(params).then(rs => {
          if (rs) {
            dispatch('getUserAddress')
            resolve(rs)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    updateUserAddress ({ dispatch }, params) {
      return new Promise((resolve, reject) => {
        updateUserAddress(params).then(rs => {
          if (rs) {
            dispatch('getUserAddress')
            resolve(rs)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    removeUserAddress ({ dispatch }, params) {
      return new Promise((resolve, reject) => {
        deleteUserAddress(params).then(rs => {
          if (rs) {
            dispatch('getUserAddress')
            resolve(rs)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    setAddressDefault ({ dispatch }, params) {
      return new Promise((resolve, reject) => {
        setAddressDefault(params).then(rs => {
          if (rs) {
            dispatch('getUserAddress')
            resolve(rs)
          }
        }).catch(err => {
          reject(err)
        })
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
