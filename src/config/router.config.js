import BasicLayout from '@/layouts/admin/BasicLayout'
export const asyncRouterMap = [
  {
    path: '/admin',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home', breadcrumbText: 'menu.home' },
    redirect: 'dashboard',
    children: [
      // DASHBOARD
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/admin/dashboard/Analysis'),
        hideChildrenInMenu: true,
        meta: {
          title: 'menu.home',
          keepAlive: true,
          icon: 'home',
          requiredLogin: true
        }
      }
    ]
  }
]

export const constRouteMapClient = [
  {
    path: '/',
    component: () => import('@/views/client/user/index'),
    exact: true,
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/client/user/home/index')
      },
      {
        path: '/category/:categoryId',
        name: 'productsByCategory',
        component: () => import('@/views/client/user/products_by_category/index')
      },
      {
        path: '/product/:slugWithId',
        name: 'product-detail',
        exact: true,
        component: () => import('@/views/client/user/product_detail/index')
      },
      {
        path: '/cart',
        name: 'cart',
        exact: true,
        component: () => import('@/views/client/user/cart/index')
      },
      {
        path: '/user-info',
        component: () => import('@/views/client/user/user_profile/index'),
        children: [
          {
            path: '/',
            name: 'userInfo',
            component: () => import('@/views/client/user/user_profile/user_info/index')
          },
          {
            path: '/user-address',
            name: 'userAddress',
            component: () => import('@/views/client/user/user_profile/user_address/index')
          },
          {
            path: '/user-pass',
            name: 'userPass',
            component: () => import('@/views/client/user/user_profile/user_pass/index')
          },
          {
            path: '/purchase',
            name: 'purchase',
            component: () => import('@/views/client/user/user_profile/purchase/index')
          }
        ]
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

export const asyncRouterAuth = [
  {
    path: '/auth',
    component: () => import('@/views/client/auth/index'),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/client/auth/login/index')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('@/views/client/auth/register/index')
      }
    ]
  },
  {
    path: '/404',
    exact: true,
    name: 'pageNotFound',
    component: () => import('@/layouts/general/exception/404')
  }
]
