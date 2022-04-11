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
  getListCategoryParent: 'category/getListCategoryParent',

  // cart
  getListBillBySellerInCart: 'bill/cart',
  addToCart: '/bill/addToCart',
  updateQuantityProductInCart: '/bill/updateQuantityProductInCart',
  deleteProductInCart: '/bill/deleteProductInCart',
  deleteProductsInCart: '/bill/deleteProductsInCart',
  buyProducts: 'bill/buyProducts'
}

export default api
