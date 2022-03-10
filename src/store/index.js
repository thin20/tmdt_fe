import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'

import user from './modules/user'
import cart from './modules/cart'
import getters from './getters'

Vue.use(Vuex)

const vuex = new Vuex.Store({
  modules: {
    app,
    user,
    cart
  },
  state: {},
  mutations: {},
  actions: {},
  getters
})
export default vuex
