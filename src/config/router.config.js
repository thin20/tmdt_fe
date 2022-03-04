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
