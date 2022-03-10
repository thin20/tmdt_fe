import Vue from 'vue'
import Router from 'vue-router'
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

// const pathRequireAuth = []

router.beforeEach((routeTo, routeFrom, next) => {
  next()
})
// router.beforeResolve(async (routeTo, routeFrom, next) => {
//   console.log('routeTo', routeTo)
// })
// router.afterEach((routeTo, routeFrom) => {})
export default router
