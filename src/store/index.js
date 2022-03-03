import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'

// default router permission control
import permission from './modules/permission'
import user from './modules/user'

// dynamic router permission control (Experimental)
// import permission from './modules/async-router'
import getters from './getters'

Vue.use(Vuex)

const vuex = new Vuex.Store({
  modules: {
    app,
    permission,
    user
  },
  state: {},
  mutations: {},
  actions: {},
  getters
})
export default vuex
