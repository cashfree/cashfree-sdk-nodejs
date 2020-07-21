const URLS = {
  BENEFICIARY_ADD: '/payout/v1/addBeneficiary',
  BENEFICIARY_GET_BY_ID: '/payout/v1/getBeneficiary/',
  BENEFICIARY_GET_ID_BY_BANK_DETAILS: '/payout/v1/getBeneId',
  BENEFICIARY_REMOVE: '/payout/v1/removeBeneficiary',

  CASHGRAM_CREATE: '/payout/v1/createCashgram',
  CASHGRAM_GET_STATUS: '/payout/v1/getCashgramStatus',
  CASHGRAM_DEACTIVATE: '/payout/v1/deactivateCashgram',

  SELF_WITHDRAWAL: '/payout/v1/selfWithdrawal',
  GET_BALANCE: '/payout/v1/getBalance',

  REQUEST_TRANSFER: '/payout/v1/requestTransfer',
  ASYNC_REQUEST_TRANSFER: '/payout/v1/requestAsyncTransfer',
  GET_TRANSFER_STATUS: '/payout/v1/getTransferStatus',
  GET_TRANSFERS: '/payout/v1/getTransfers',
  REQUEST_BATCH_TRANSFER: '/payout/v1/requestBatchTransfer',
  GET_BATCH_TRANSFER_STATUS: '/payout/v1/getBatchTransferStatus',

  VALIDATE_BANK_DETAILS: '/payout/v1/validation/bankDetails',
  ASYNC_VALIDATE_BANK_DETAILS: '/payout/v1/asyncValidation/bankDetails',
  GET_BANK_VALIDATION_STATUS: '/payout/v1/getValidationStatus/bank',
  VALIDATE_UPI_DETAILS: '/payout/v1/validation/upiDetails',
  VALIDATE_BULK_BANK_ACTIVATION: '/payout/v1/bulkValidation/bankDetails',
  GET_BULK_VALIDATION_STATUS: '/payout/v1/getBulkValidationStatus',
};

const ENVS = {
  TEST: {
    mpaEndpoint: 'payout-gamma.cashfree.com',
  },
  PRODUCTION: {
    mpaEndpoint: 'payout-api.cashfree.com',
  },
};

module.exports = {
  ...URLS,
  ENVS,
};
