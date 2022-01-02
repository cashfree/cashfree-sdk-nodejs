## Payouts API Guide

Please refer to the [Cashfree Docs](https://docs.cashfree.com/) for the complete API reference.

`Node version 10.9.0 was used for this SDK.`

### Get Started

###### In case of static IP (Your IP is whitelisted)

```js
const { Payouts } = require('@cashfreepayments/cashfree-sdk');

// Initialize Cashfree Payouts
const payouts = new Payouts({
  env: 'TEST',
  clientId: '<CLIENT_ID>',
  clientSecret: '<CLIENT_SECRET>',
});
```

###### In case of dynamic IP you will need a public key for signature.

```js
const { Payouts } = require('@cashfreepayments/cashfree-sdk');

// Initialize Cashfree Payouts
const payouts = new Payouts({
  env: 'TEST',
  clientId: '<CLIENT_ID>',
  clientSecret: '<CLIENT_SECRET>',
  pathToPublicKey: '/path/to/your/public/key/file.pem',
  publicKey: 'ALTERNATIVE TO SPECIFYING PATH (DIRECTLY PASTE PublicKey)',
});
```

### Beneficiary

Contains all APIs related to beneficiary.

- [Add Beneficiary](https://docs.cashfree.com/reference#create-beneficiary)
  ```js
  payouts.beneficiary
    .add({
      beneId: 'JOHN18012',
      name: 'john doe',
      email: 'johndoe@cashfree.com',
      phone: '9876543210',
      bankAccount: '00001111222233',
      ifsc: 'HDFC0000001',
      address1: 'ABC Street',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560001',
    })
    .then(function (response) {
      console.log(response);
    });
  ```
- [Get Beneficiary Details](https://docs.cashfree.com/reference#get-beneficiary-details)
  ```js
  payouts.beneficiary
    .getById({
      beneId: 'JOHN18011',
    })
    .then(function (d) {
      console.log(d);
    });
  ```
- [Get Beneficiary Id](https://docs.cashfree.com/reference#get-beneficiary-id)
  ```js
  payouts.beneficiary
    .getIdByBankDetails({
      bankAccount: '00001111222233',
      ifsc: 'HDFC0000001',
    })
    .then(function (d) {
      console.log(d);
    });
  ```
- [Remove Beneficiary](https://docs.cashfree.com/reference#remove-beneficiary)
  ```js
  payouts.beneficiary
    .remove({
      beneId: 'JOHN18011',
    })
    .then(function (d) {
      console.log(d);
    });
  ```
- [Get Beneficiary History](https://docs.cashfree.com/reference#get-beneficiary-history)
  ```js
  payouts.beneficiary
    .getHistory({
      beneId: 'JOHN18011',
      startDate: "2021-09-21", // optional
      endDate: "2021-10-07", // optional
      perPage: 25, // optional, max limit 25
      page: 2, // optional, but default value is always 1 if not specified
    })
    .then(function (d) {
      console.log(d);
    });
  ```

### Transfers

Contains all APIs related to Transfers.

##### Initializing Transfers

#

- [Request Transfer](https://docs.cashfree.com/reference#standard-transfer-sync)

  ```js
  payouts.transfers
    .requestTransfer({
      beneId: 'JOHN18012',
      amount: '100.00',
      transferId: 'DEC2017',
    })
    .then(function (d) {
      console.log(d);
    });
  ```

- [Get Transfer Status](https://docs.cashfree.com/reference#standard-transfer-async)
  ```js
  payouts.transfers
    .getTransferStatus({
      referenceId: '14057',
      transferId: 'JUNOB2018',
    })
    .then(function (d) {
      console.log(d);
    });
  ```
- [Get Transfers](https://docs.cashfree.com/reference#get-transfer-status)
  ```js
  payouts.transfers
    .getTransfers({
      maxReturn: 10,
    })
    .then(function (d) {
      console.log(d);
    });
  ```
- [Request Batch Transfer](https://docs.cashfree.com/reference#batch-transfer)

  ```js
  payouts.transfers
    .requestBatchTransfer({
      batchTransferId: 'Test_Bank_Account_Format_45',
      batchFormat: 'BANK_ACCOUNT',
      deleteBene: 1,
      batch: [
        {
          transferId: 'PTM_00121241112',
          amount: '12',
          phone: '9999999999',
          bankAccount: '9999999999',
          ifsc: 'PYTM0_000001',
          email: 'bahrat@gocashfree.com',
          name: 'bharat',
        },
        {
          transferId: 'PTM_00052312126',
          amount: '12',
          phone: '9999999999',
          bankAccount: '9999999999',
          ifsc: 'PYTM0000001',
          email: 'bharat@gocashfree.com',
          name: 'bharat',
        },
        {
          transferId: 'PTM_0001321215',
          amount: '12',
          phone: '9999999999',
          bankAccount: '9999999999',
          ifsc: 'PYTM0000001',
          email: 'bahrat@gocashfree.com',
          name: 'bharat',
        },
      ],
    })
    .then(function (d) {
      console.log(d);
    });
  ```

* [Get Batch Transfer Status](https://docs.cashfree.com/reference#get-batch-transfer-status)

  ```js
  payouts.transfers
    .getBatchTransferStatus({
      batchTransferId: 'Test_Bank_Account_Format_45',
    })
    .then(function (d) {
      console.log(d);
    });
  ```

### Validation

Contains all APIs related to Validation.

- [Validate Bank Details](https://docs.cashfree.com/docs/payout/guide/#bank-details-validation)

  ```js
  payouts.validation
    .validateBankDetails({
      name: 'JOHN',
      phone: '9908712345',
      bankAccount: '026291800001191',
      ifsc: 'YESB0000262',
    })
    .then(function (d) {
      console.log(d);
    });
  ```

- [Validate UPI Details](https://docs.cashfree.com/docs/payout/guide/#upi-validation)

  ```js
  payouts.validation
    .validateUPIDetails({
      name: 'Cashfree',
      vpa: 'success@upi',
    })
    .then(function (d) {
      console.log(d);
    });
  ```

- [Validate Bulk Bank Activation](https://docs.cashfree.com/docs/payout/guide/#bulk-bank-validation-api)

  ```js
  payouts.validation
    .validateBulkBankActivation({
      bulkValidationId: 'testid1',
      entries: [
        {
          name: 'Sameera Cashfree',
          bankAccount: '000890289871772',
          ifsc: 'SCBL0036078',
          phone: '9015991882',
        },
        {
          name: 'Cashfree Sameera',
          bankAccount: '0001001289877623',
          ifsc: 'SBIN0008752',
          phone: '9023991882',
        },
      ],
    })
    .then(function (d) {
      console.log(d);
    });
  ```

- [Get Bulk Validation Status](https://docs.cashfree.com/docs/payout/guide/#get-bulkvalidate-status-request)
  ```js
  payouts.validation
    .getBulkValidationStatus({
      bulkValidationId: 'testid1',
    })
    .then(function (d) {
      console.log(d);
    });
  ```

### Cashgram

Contains all APIs related to Cashgram.

- [Create Cashgram](https://docs.cashfree.com/docs/payout/guide/#cashgram)
  ```js
  payouts.cashgram
    .create({
      cashgramId: 'JOHaN10',
      amount: '1',
      name: 'john doe',
      email: 'johndoe@cashfree.com',
      phone: '9876543210',
      linkExpiry: '2018/09/12',
      remarks: 'api',
      notifyCustomer: 1,
    })
    .then(function (d) {
      console.log(d);
    });
  ```
- [Get Cashgram Status](https://docs.cashfree.com/docs/payout/guide/#get-cashgram-status)
  ```js
  payouts.cashgram
    .getStatus({
      cashgramId: 'JOHaN10',
    })
    .then(function (d) {
      console.log(d);
    });
  ```
- [Deactivate Cashgram](https://docs.cashfree.com/docs/payout/guide/#deactivate-cashgram)
  ```js
  payouts.cashgram
    .deactivate({
      cashgramId: 'JOHaN10',
    })
    .then(function (d) {
      console.log(d);
    });
  ```

### Common

- [Get Balance](https://docs.cashfree.com/docs/payout/guide/#get-balance)

  ```js
  payouts.getBalance().then(function (d) {
    console.log(d);
  });
  ```

- [Self Withdrawal](https://docs.cashfree.com/docs/payout/guide/#self-withdrawal)
  ```js
  payouts
    .selfWithdrawal({
      withdrawalId: 'withdraw1',
      amount: 100,
      remarks: 'withdrawal request',
    })
    .then(function (d) {
      console.log(d);
    });
  ```
