export const loginType = Object.freeze({
  NUMBER_PHONE: 0,
  FACEBOOK: 1,
  GOOGLE: 2,
  GITHUB: 3
})

export const PurchaseType = Object.freeze({
  ALL: 0,
  ORDER: 1,
  WAIT_CONFIRM: 2,
  WAIT_TAKE: 3,
  DELIVERING: 4,
  DELIVERED: 5,
  CANCELED: 6
})

export const ACTION_TYPE = Object.freeze({
  WAIT_CONFIRM: 3,
  DELIVERING: 4,
  DELIVERED: 5
})

export const SortType = Object.freeze({
  NEWEST: 'created_at',
  POPULAR: 'star',
  BEST_SALE: 'sold',
  FAVOURITE: 'favourite',
  PRICE: 'price'
})

export const OrderType = Object.freeze({
  DESC: 'desc',
  ASC: 'asc'
})

export const FavouriteLevel = 1
