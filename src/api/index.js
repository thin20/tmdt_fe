const api = {
  // user
  login: '/user/login',
  loginByToken: '/user/loginByToken',
  register: '/user/register',
  updateUserInfo: '/user/updateUserInfo',
  changePassword: '/user/changePassword',
  changeAvatar: '/user/changeAvatar',

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
  searchListProductBySeller: 'product/getListProductBySeller',
  createProduct: '/product/createProduct',
  updateProduct: '/product/updateProduct',
  changeStatusProduct: '/product/changeStatusSell',
  addProductVisit: '/product/addProductVisit',

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
  getListBillSellerByPurchaseType: '/bill/listBillOfSeller',

  // dashboard
  getRevenueByDate: 'dashboard/getRevenueSellerByDate'
}

export default api
