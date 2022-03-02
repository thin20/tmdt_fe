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
        path: '/404',
        exact: true,
        name: 'pageNotFound',
        component: () => import('@/layouts/general/exception/404')
      }
    ]
  }
]
