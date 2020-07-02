# Payment Gateway API Guide

## API Documentation

Please refer to the [Cashfree Docs](https://docs.cashfree.com/docs/) for the complete API reference.

`Node version 10.9.0 was used for this SDK.`

### Get Started

```js
const { PaymentGateway } = require('cashfree-sdk');

// Instantiate Cashfree Payment Gateway
const pg = new PaymentGateway({
  env: '<ENVIRONMENT>',
  apiVersion: '<API_VERSION>',
  appId: '<YOUR_APP_ID>',
  secretKey: '<YOUR_SECRET_KEY>',
});
```

| Option     | Required |                             Description                              |
| :--------- | :------: | :------------------------------------------------------------------: |
| env        |   true   | Environment to be initialized. Must be one of `TEST` or `PRODUCTION` |
| apiVersion |   true   |                 Api version to be used. e.g. `1.0.0`                 |
| appId      |   true   | Your application id which can be retreived from cashfree dashboard.  |
| secretKey  |   true   |   Your secret key which can be retreived from cashfree dashboard.    |

## Response Format

The response format for all requests is a `JSON` object.

Whether a request succeeded is indicated by the HTTP status code. A 2xx status code indicates success, whereas a 4xx status code indicates failure. When a request fails, the response body is still JSON, but always contains the fields `status` and `message` (only if status is an error) which you can inspect to use for debugging. For example, trying to save an object with invalid keys will return the message:

| Parameter |                    Description                    |
| :-------- | :-----------------------------------------------: |
| status    | status of API call. Values are - `OK` and `ERROR` |
| message   |     reason of failure when status is `ERROR`      |

## Example

### Using Promises

Every method returns a promise which can be used:

```js
const { PaymentGateway } = require('cashfree-sdk');

const pg = new PaymentGateway({
  env: '<ENVIRONMENT>',
  apiVersion: '<API_VERSION>',
  appId: '<YOUR_APP_ID>',
  secretKey: '<YOUR_SECRET_KEY>',
});

pg.orders
  .getLink({
    orderId: '<ORDER_ID>',
  })
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
```

### Using Async/Await

```js
const { PaymentGateway } = require('cashfree-sdk');

const pg = new PaymentGateway({
  env: '<ENVIRONMENT>',
  apiVersion: '<API_VERSION>',
  appId: '<YOUR_APP_ID>',
  secretKey: '<YOUR_SECRET_KEY>',
});

async function getOrderLink() {
  try {
    const response = await pg.orders.getLink({ orderId: '<ORDER_ID>' });
    console.log(response);
  } catch (e) {
    console.error(e);
  }
}
```

### Verify Credentials

Refer [Verify Credentials](https://docs.cashfree.com/docs/rest/guide/#credentials-verify-api) for further documentation

```js
const { PaymentGateway } = require('cashfree-sdk');
```

```js
PaymentGateway.verifyCredentials({
  env: '<ENVIRONMENT>', // must be one of [TEST / PRODUCTION]
  appId: '<YOUR_APP_ID>',
  secretKey: '<YOUR_SECRET_KEY>',
})
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
```

### Orders

Contains all APIs related to orders.

- [Create Orders](https://docs.cashfree.com/docs/rest/guide/#create-orders)

  ```js
  pg.orders
    .createOrders({
      orderId: '<ORDER_ID>', // required
      orderAmount: '154', // required
      orderCurrency: 'INR',
      orderNote: 'Subscription',
      customerName: 'Test Name', // required
      customerPhone: '9111122222', // required
      customerEmail: 'johndoe@cashfree.com', // required
      sellerPhone: '',
      returnUrl: 'https://example.com/return', // required
      notifyUrl: 'https://example.com/notify',
      paymentModes: '',
      pc: '',
    })
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
  ```

- [Get Link](https://docs.cashfree.com/docs/rest/guide/#get-link)
  ```js
  pg.orders
    .getLink({
      orderId: '<ORDER_ID>', // required
    })
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
  ```
- [Get Details](https://docs.cashfree.com/docs/rest/guide/#get-details)
  ```js
  pg.orders
    .getDetails({
      orderId: '<ORDER_ID>', // required
    })
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
  ```
- [Get Status](https://docs.cashfree.com/docs/rest/guide/#get-status)
  ```js
  pg.orders
    .getStatus({
      orderId: '<ORDER_ID>', // required
    })
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
  ```
- [Trigger Payment Email](https://docs.cashfree.com/docs/rest/guide/#trigger-payment-email)
  ```js
  pg.orders
    .triggerPaymentEmail({
      orderId: '<ORDER_ID>', // required
    })
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
  ```

### Transactions

Contains all APIs related to Transactions.

- [Fetch Transactions](https://docs.cashfree.com/docs/rest/guide/#fetch-transactions)
  ```js
  pg.transactions
    .fetchTransactions({
      startDate: '2019-01-01', // required
      endDate: '2018-01-11', // required
      txStatus: 'SUCCESS',
      count: 2,
    })
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
  ```

### Refunds

Contains all APIs related to Refunds.

- [Initiate Refund](https://docs.cashfree.com/docs/rest/guide/#initiate-refund)
  ```js
  pg.refunds
    .initiateRefund({
      orderId: '<ORDER_ID>', // required
      referenceId: '13307', // required
      refundAmount: '102.00', // required
      refundNote: 'Sample Refund note', // required
      refundType: '',
      refundType: '',
      mode: '',
      accountNo: '',
      ifsc: '',
    })
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
  ```
- [Fetch All Refunds](https://docs.cashfree.com/docs/rest/guide/#fetch-all-refunds)
  ```js
  pg.refunds
    .fetchAllRefunds({
      startDate: '2016-04-01', // required
      endDate: '2016-04-27', // required
      count: 2,
    })
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
  ```
- [Fetch Single Refund](https://docs.cashfree.com/docs/rest/guide/#fetch-single-refund)
  ```js
  pg.refunds
    .fetchSingleRefund({
      refundId: '<REFUND_ID>',
      merchantRefundId: '1', // Provide refundId or merchantRefundId to get refund status
    })
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
  ```

### Settlements

Contains all APIs related to Settlements.

- [Fetch All Settlements](https://docs.cashfree.com/docs/rest/guide/#fetch-all-settlements)
  ```js
  pg.settlements
    .fetchAllSettlements({
      startDate: '2016-04-01', // required
      endDate: '2016-04-30', // required
      count: 2,
    })
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
  ```
- [Fetch Single Settlement](https://docs.cashfree.com/docs/rest/guide/#fetch-single-settlement)
  ```js
  pg.settlements
    .fetchSettlementById({
      settlementId: '<SETTLEMENT_ID>', // required
      count: 2,
    })
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
  ```
