## Payouts API GUIDE

Please refer to the [Cashfree Docs](https://docs.cashfree.com/docs/)  for the complete API reference.

### Beneficiary
Contains all APIs related to beneficiary.

##### Initializing Beneficiary
#
```js
const Cashfree = require("cashfree-sdk");

//Initialize Cashfree Payout
let Payouts = Cashfree.Payouts;
Payouts.Init({
    "ENV": "TEST", 
    "ClientID": "CLIENTID",
    "ClientSecret": "CLIENTSECRET"
});

//Initializing Beneficiary
let Beneficiary = Payouts.Beneficiary;
```


- [Add Beneficiary](https://docs.cashfree.com/docs/payout/guide/#add-beneficiary)
    ```js
    Beneficiary.Add({
    	"beneId": "JOHN18012", 
    	"name": "john doe",
    	"email": "johndoe@cashfree.com", 
    	"phone": "9876543210", 
    	"bankAccount": "00001111222233", 
    	"ifsc": "HDFC0000001", 
    	"address1" : "ABC Street", 
    	"city": "Bangalore", 
    	"state":"Karnataka", 
    	"pincode": "560001"
    }).then(function(d){
	    console.log(d)
    });
    ```
- [Get Beneficiary Details](https://docs.cashfree.com/docs/payout/guide/#get-beneficiary-details)
    ```js
    Beneficiary.GetDetails({
    	"beneId": "JOHN18011"
    }).then(function(d){
    	console.log(d)
    });
    ```
- [Get Beneficiary Id](https://docs.cashfree.com/docs/payout/guide/#fetch-beneficiary-id)
    ```js
    Beneficiary.GetBeneId({
    	"bankAccount": "00001111222233",
	    "ifsc": "HDFC0000001"
    }).then(function(d){
    	console.log(d)
    });
    ```
- [Remove Beneficiary](https://docs.cashfree.com/docs/payout/guide/#fetch-beneficiary-id)
    ```js
    Beneficiary.Remove({
    	"beneId": "JOHN18011"
    }).then(function(d){
    	console.log(d)
    });
    ```
    
### Transfers
Contains all APIs related to Transfers.
##### Initializing Transfers
#
```js
const Cashfree = require("cashfree-sdk");

//Initialize Cashfree Payout
let Payouts = Cashfree.Payouts;
Payouts.Init({
    "ENV": "TEST", 
    "ClientID": "CLIENTID",
    "ClientSecret": "CLIENTSECRET"
});

//Initializing Transfers
let Transfers = Payouts.Transfers;
```

- [Request Transfer](https://docs.cashfree.com/docs/payout/guide/#request-transfer)
    ```js
    Transfers.RequestTransfer({
    	"beneId" : "JOHN18012", 
    	"amount": "100.00", 
    	"transferId": "DEC2017"
    }).then(function(d){
    	console.log(d)
    });
    ```

- [Get Transfer Status](https://docs.cashfree.com/docs/payout/guide/#get-transfer-status)
    ```js
    Transfers.GetTransferStatus({
    	"referenceId": "14057",
    	"transferId": "JUNOB2018"
    }).then(function(d){
    	console.log(d)
    });
    ```
    
- [Get Transfers](https://docs.cashfree.com/docs/payout/guide/#list-transfers)
    ```js
    Transfers.GetTransfers({
    	maxReturn: 10	
    }).then(function(d){
    	console.log(d)
    });
    ```
    
- [Request Batch Transfer](https://docs.cashfree.com/docs/payout/guide/#batchtransfer-api)
    ```js
    Transfers.RequestBatchTransfer({
	"batchTransferId" : "Test_Bank_Account_Format_45",
	"batchFormat": "BANK_ACCOUNT" ,
	"deleteBene" : 1, 
	"batch" : [
	    {"transferId" : "PTM_00121241112", 
	    "amount" : "12",
	    "phone" : "9999999999",
	    "bankAccount" : "9999999999" , 
	    "ifsc" : "PYTM0_000001",
	    "email" : "bahrat@gocashfree.com", 
	    "name": "bharat"},
	    {"transferId" : "PTM_00052312126",
	    "amount" : "12",
	    "phone" : "9999999999", 
	    "bankAccount" : "9999999999" , 
	    "ifsc" : "PYTM0000001",
	    "email" : "bharat@gocashfree.com", 
	    "name": "bharat" },
	    {"transferId" : "PTM_0001321215",
	    "amount" : "12","phone" : "9999999999", 
	    "bankAccount" : "9999999999" , 
	    "ifsc" : "PYTM0000001",
	    "email" : "bahrat@gocashfree.com", "name": "bharat"}
	    ]
    }).then(function(d){
    	console.log(d)
    });
    ```

- [Get Batch Transfer Status](https://docs.cashfree.com/docs/payout/guide/#get-batch-transfer-status-request)
    ```js
    Transfers.GetBatchTransferStatus({
    	"batchTransferId": "Test_Bank_Account_Format_45"
    }).then(function(d){
    	console.log(d)
    });
    ```

### Validation
Contains all APIs related to Validation.

##### Initializing Validation
#
```js
const Cashfree = require("cashfree-sdk");

//Initialize Cashfree Payout
let Payouts = Cashfree.Payouts;
Payouts.Init({
    "ENV": "TEST", 
    "ClientID": "CLIENTID",
    "ClientSecret": "CLIENTSECRET"
});

//Initializing Validation
let Validation = Payouts.Validation;
```
- [Validate Bank Details](https://docs.cashfree.com/docs/payout/guide/#bank-details-validation)
    ```js
    Validation.ValidateBankDetails({
    	name: "JOHN",
    	phone: "9908712345",
    	bankAccount: "026291800001191",
    	ifsc: "YESB0000262"
    }).then(function(d){
    	console.log(d)
    });
    ```

- [Validate UPI Details](https://docs.cashfree.com/docs/payout/guide/#upi-validation)
    ```js
    Validation.ValidateUPIDetails({
    	"name": "Cashfree",
    	"vpa": "success@upi"
    }).then(function(d){
    	console.log(d)
    });
    ```

- [Validate Bulk Bank Activation](https://docs.cashfree.com/docs/payout/guide/#bulk-bank-validation-api)
    ```js
    Validation.ValidateBulkBankActivation({
    	"bulkValidationId":"testid1", 
    	"entries":[
    	    { "name":"Sameera Cashfree", 
    	    "bankAccount":"000890289871772", 
    	    "ifsc":"SCBL0036078", 
    	    "phone":"9015991882"},
    	    { "name":"Cashfree Sameera", 
    	    "bankAccount":"0001001289877623", 
    	    "ifsc":"SBIN0008752", 
    	    "phone":"9023991882"}
        ]
    }).then(function(d){
    	console.log(d)
    });
    ```

- [Get Bulk Validation Status](https://docs.cashfree.com/docs/payout/guide/#get-bulkvalidate-status-request)
    ```js
    Validation.GetBulkValidationStatus({
    	"bulkValidationId":"testid1"
    }).then(function(d){
    	console.log(d)
    });
    ```

### Cashgram
Contains all APIs related to Cashgram.

##### Initializing Cashgram
#
```js
const Cashfree = require("cashfree-sdk");

//Initialize Cashfree Payout
let Payouts = Cashfree.Payouts;
Payouts.Init({
    "ENV": "TEST", 
    "ClientID": "CLIENTID",
    "ClientSecret": "CLIENTSECRET"
});

//Initializing Cashgram
let Cashgram = Payouts.Cashgram;
```

- [Create Cashgram](https://docs.cashfree.com/docs/payout/guide/#cashgram)
    ```js
    Cashgram.CreateCashgram({
    	"cashgramId": "JOHaN10",
    	"amount": "1" , 
    	"name": "john doe",
    	"email": "johndoe@cashfree.com", 
    	"phone": "9876543210",
    	"linkExpiry" : "2018/09/12",
    	"remarks" :"api",
    	"notifyCustomer" : 1
    }).then(function(d){
    	console.log(d)
    });
    ```
    
- [Get Cashgram Status](https://docs.cashfree.com/docs/payout/guide/#get-cashgram-status)
    ```js
    Cashgram.GetCashgramStatus({
    	"cashgramId": "JOHaN10"
    }).then(function(d){
    	console.log(d)
    });
    ```
    
- [Deactivate Cashgram](https://docs.cashfree.com/docs/payout/guide/#deactivate-cashgram)
    ```js
    Cashgram.DeactivateCashgram({
    	"cashgramId": "JOHaN10"
    }).then(function(d){
    	console.log(d)
    });
    ```
    
### Common

- [Get Balance](https://docs.cashfree.com/docs/payout/guide/#get-balance)
    ```js
    Payouts.GetBalance({
    }).then(function(d){
    	console.log(d)
    });
    ```

- [Self Withdrawal](https://docs.cashfree.com/docs/payout/guide/#self-withdrawal)
    ```js
    Payouts.SelfWithdrawal({
    	"withdrawalId" : "withdraw1",
    	"amount": 100,
    	"remarks": "withdrawal request"
    }).then(function(d){
    	console.log(d)
    });
    ```
