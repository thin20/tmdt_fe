const api = {
  // user
  login: '/user/login',
  loginByToken: '/user/loginByToken',
  register: '/user/register',

  // product
  searchListProduct: 'product/search-list',
  likeProduct: 'productUserLiked/likeProduct',
  getProductDetail: 'product/getProductDetail',

  // category
  getListCategory: 'category/getListCategory',
  getListCategoryParent: 'category/getListCategoryParent'
}

export default api
