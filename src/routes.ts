export const ROUTES = {
  HOME: "/",
  CART: "/cart",
  PROFILE: "/profile",
  PAYMENT_SUCCESS: "/payment-success",
  ORDER: "/orders",
  ALL_PRODUCT: "/all-product",
  ALL_PACKAGE: "/all-package",
  SPIN: "/spin",
  CHAT_OA: '/chat-oa',
  ORDER_DETAIL: (id) => `/orders/${id}`,
  PRODUCT_DETAIL: (id) => `/products/${id}`,
  USER_ADDRESS: "/addresses",
  USER_ADDRESS_ADD: "/addresses-add",
  NOT_FOUND: "*",
  NOTIFICATION: (id) => `/notification/${id}`,
  COMMISSION: "/commission",
  MEMBER_CARD: "/member-card",
  RESULT: "/result",
  SEARCH: "/search",
  SEARCH_RESULT: "/search-result",
  INCOME: "/income",
  REQUEST_COMMISSION: "/request-commission",
  BANK_ACCOUNT: "/bank-account",
  SHIPPING: "/shipping",
  SHIPPING_DETAIL: "/shipping-detail",
  CTV_USER_LIST: "/ctv-user-list",

  BUY_VOUCHER: "/buy-voucher",
  USER_VOUCHER: "/user-voucher",
};
