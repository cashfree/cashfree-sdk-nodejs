const URLS = {
  TEST_BASE_URL: 'test.cashfree.com',
  PROD_BASE_URL: 'api.cashfree.com',

  ORDER_CREATE: '/api/v1/order/create',
  ORDER_GET_LINK: '/api/v1/order/info/link',
  ORDER_GET_DETAILS: '/api/v1/order/info',
  ORDER_GET_STATUS: '/api/v1/order/info/status',
  ORDER_EMAIL: '/api/v1/order/email',
  ORDER_REFUND: '/api/v1/order/refund',

  TRANSACTIONS: '/api/v1/transactions',

  REFUNDS: '/api/v1/refunds',
  REFUND_STATUS: '/api/v1/refundStatus',

  SETTLEMENTS: '/api/v1/settlements',
  SETTLEMENT: '/api/v1/settlement',

  VERIFY_CREDENTIALS: '/api/v1/credentials/verify',
};

module.exports = {
  ...URLS,
};
