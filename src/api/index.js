const api = {
  // user
  login: '/user/login',
  loginByToken: '/user/loginByToken',
  register: '/user/register',
  updateUserInfo: '/user/updateUserInfo',
  changePassword: '/user/changePassword',

  // address
  getListAddress: '/address/getListAddress',
  createUserAddress: '/address/createUserAddress',
  updateUserAddress: '/address/updateUserAddress',
  deleteUserAddress: '/address/deleteUserAddress',
  setAddressDefault: '/address/setAddressDefault',

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
  buyProducts: 'bill/buyProducts',

  // bill
  getListBillByPurchaseType: '/bill/listBill',
  updateBillStatus: 'bill/updateBillStatus',
  getListBillSellerByPurchaseType: '/bill/listBillOfSeller'
}

export default api
