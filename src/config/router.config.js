export const constRouteMapClient = [
  {
    path: '/',
    component: () => import('@/views/client/user/index'),
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
  },
  {
    path: '/404',
    exact: true,
    name: 'pageNotFound',
    component: () => import('@/layouts/general/exception/404')
  }
]
