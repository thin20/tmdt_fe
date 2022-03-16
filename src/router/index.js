import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
import {
  constRouteMapClient,
  asyncRouterAuth,
  asyncRouterMap
} from '@/config/router.config'
import NProgress from 'nprogress' // progress bar
NProgress.configure({ showSpinner: false }) // NProgress Configuration

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: constRouteMapClient.concat(asyncRouterAuth, asyncRouterMap)
})

const pathRequireAuth = ['/cart', '/user-info', '/admin/']

router.beforeEach((routeTo, routeFrom, next) => {
  if (!Vue.$cookies.get('token')) {
    if (pathRequireAuth.includes(routeTo.path)) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    if (!store.getters.isLogin) {
      store.dispatch('loginByToken').then(rs => {
        if (rs) {
          next()
        } else {
          next({ name: 'login' })
        }
      }).catch(err => {
        Vue.$toast(err)
        next({ name: 'login' })
      })
    }
    next()
  }
})
// router.beforeResolve(async (routeTo, routeFrom, next) => {
//   console.log('routeTo', routeTo)
// })
// router.afterEach((routeTo, routeFrom) => {})
export default router
