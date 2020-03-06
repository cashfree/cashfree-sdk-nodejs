## PG API GUIDE

Please refer to the [Cashfree Docs](https://docs.cashfree.com/docs/)  for the complete API reference.
Node version 10.9.0 was used for this SDK.

### Initialize PG
```js
const PG = require('cashfree-sdk').PG;

// Initialize Cashfree Payment Gateway
PG.Init({
    env: '<ENVIRONMENT>',
    apiVersion: '<API_VERSION>',
    appId: '<YOUR_APP_ID>',
    secretKey: '<YOUR_SECRET_KEY>',
});
```

| Option         | Required      | Description                                                           |
| :------------- |:-------------:| :--------------------------------------------------------------------:|
| env            | true          | Environment to be initialized. Must be one of `TEST` or `PRODUCTION`  |
| apiVersion     | true          | Api version to be used. e.g. `1.0.0`                                  |
| appId          | true          | Your application id which can be retreived from cashfree dashboard.   |
| secretKey      | true          | Your secret key which can be retreived from cashfree dashboard.       |

#


### Credentials Verification
Contains the API to verify Credentials.
#
```js
const PG = require('cashfree-sdk').PG;
```
- [Verify Credentials](https://docs.cashfree.com/docs/rest/guide/#credentials-verify-api)
    ```js
    PG.verifyCredentials({
        env: '<ENVIRONMENT>', // must be one of [TEST / PRODUCTION]
        appId: '<YOUR_APP_ID>',
        secretKey: '<YOUR_SECRET_KEY>',
    }).then(data => console.log(data)).catch(error => console.log(error));
    ```

### Orders
Contains all APIs related to orders.

##### Initializing Orders
#

```js
const PG = require('cashfree-sdk').PG;
```

> Initialize PG with api keys and environment [see example](#initialize-pg)

```js
const Orders = PG.Orders;
```


- [Create Orders](https://docs.cashfree.com/docs/rest/guide/#create-orders)
    ```js
    Orders.CreateOrders({
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
    }).then(data => console.log(data)).catch(error => console.log(error));
    ```
- [Get Link](https://docs.cashfree.com/docs/rest/guide/#get-link)
    ```js
    Orders.GetLink({
        orderId: '<ORDER_ID>', // required
    }).then(data => console.log(data)).catch(error => console.log(error));;
    ```
- [Get Details](https://docs.cashfree.com/docs/rest/guide/#get-details)
    ```js
    Orders.GetDetails({
        orderId: '<ORDER_ID>', // required
    }).then(data => console.log(data)).catch(error => console.log(error));
    ```
- [Get Status](https://docs.cashfree.com/docs/rest/guide/#get-status)
    ```js
    Orders.GetStatus({
        orderId: '<ORDER_ID>', // required
    }).then(data => console.log(data)).catch(error => console.log(error));
    ```
- [Trigger Payment Email](https://docs.cashfree.com/docs/rest/guide/#trigger-payment-email)
    ```js
    Orders.TriggerPaymentEmail({
        orderId: '<ORDER_ID>', // required
    }).then(data => console.log(data)).catch(error => console.log(error));
    ```
    
### Transactions
Contains all APIs related to Transactions.
##### Initializing Transactions
#
```js
const PG = require('cashfree-sdk').PG;

// Initialize Cashfree Payment Gateway
PG.Init({
    env: '<ENVIRONMENT>',
    apiVersion: '<API_VERSION>',
    appId: '<YOUR_APP_ID>',
    secretKey: '<YOUR_SECRET_KEY>',
});

// Initializing Transactions
const Transactions = PG.Transactions;
```

- [Fetch Transactions](https://docs.cashfree.com/docs/rest/guide/#fetch-transactions)
    ```js
    Transactions.FetchTransactions({ 
        startDate: '2019-01-01', // required
        endDate: '2018-01-11', // required
        txStatus: 'SUCCESS',
        lastId: '',
        count: 2,
    }).then(data => console.log(data)).catch(error => console.log(error));
    ```

    
### Refunds
Contains all APIs related to Refunds.
##### Initializing Refunds
#
```js
const PG = require('cashfree-sdk').PG;

// Initialize Cashfree Payment Gateway
PG.Init({
    env: '<ENVIRONMENT>',
    apiVersion: '<API_VERSION>',
    appId: '<YOUR_APP_ID>',
    secretKey: '<YOUR_SECRET_KEY>',
});

// Initializing Refunds
const Refunds = PG.Refunds;
```

- [Initiate Refund](https://docs.cashfree.com/docs/rest/guide/#initiate-refund)
    ```js
    Refunds.InitiateRefund({
        orderId: '<ORDER_ID>', // required
        referenceId: '13307', // required
        refundAmount: '102.00', // required
        refundNote: 'Sample Refund note', // required
        refundType: '',
        refundType: '',
        mode: '',
        accountNo: '',
        ifsc: '',
    }).then(data => console.log(data)).catch(error => console.log(error));
    ```
- [Fetch All Refunds](https://docs.cashfree.com/docs/rest/guide/#fetch-all-refunds)
    ```js
    Refunds.FetchAllRefunds({
        startDate: '2016-04-01', // required
        endDate: '2016-04-27', // required
        lastId: '',
        count: 2,
    }).then(data => console.log(data)).catch(error => console.log(error));
    ```
- [Fetch Single Refund](https://docs.cashfree.com/docs/rest/guide/#fetch-single-refund)
    ```js
    Refunds.FetchSingleRefund({
        refundId: '1',
        merchantRefundId: '1', // Provide refundId or merchantRefundId to get refund status
    }).then(data => console.log(data)).catch(error => console.log(error));
    ```

### Settlements
Contains all APIs related to Settlements.
##### Initializing Settlements
#
```js
const PG = require('cashfree-sdk').PG;

// Initialize Cashfree Payment Gateway
PG.Init({
    env: '<ENVIRONMENT>',
    apiVersion: '<API_VERSION>',
    appId: '<YOUR_APP_ID>',
    secretKey: '<YOUR_SECRET_KEY>',
});

// Initializing Refunds
const Settlements = PG.Settlements;
```

- [Fetch All Settlements](https://docs.cashfree.com/docs/rest/guide/#fetch-all-settlements)
    ```js
    Settlements.FetchAllSettlements({
        startDate: '2016-04-01', // required
        endDate: '2016-04-30', // required
        lastId: '',
        count: 2,
    }).then(data => console.log(data)).catch(error => console.log(error));
    ```
- [Fetch Single Settlement](https://docs.cashfree.com/docs/rest/guide/#fetch-single-settlement)
    ```js
    Settlements.FetchSingleSettlement({
        settlementId: '20', // required
        lastId: '',
        count: 2,
    }).then(data => console.log(data)).catch(error => console.log(error));
    ```