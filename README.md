Cashfree libraries are released in Beta. This is work in progress and we are continuously working on improving various aspects of it. It is released as a learning aid and an example kit for the API integrators. This is not recommended by Cashfree for direct use in production code. Please report any bugs to Cashfree at techsupport@cashfree.com.
# cashfree-sdk-nodejs

The official Cashfree SDK for JavaScript, available for Node.js backends. Node version 10.9.0 was used for this SDK.

Get started quickly using Cashfree with the Cashfree SDK for JavaScript in Node.js. The SDK helps take the complexity out of coding by providing JavaScript objects for Cashfree services including Payouts, Payment Gateway, Marketplace and Autocollect. The single, downloadable package includes the Cashfree JavaScript Library and documentation.

Please refer to the [Cashfree Docs](https://docs.cashfree.com/docs/)  for the complete API reference.

## Installing
### In Node.js

The preferred way to install the Cashfree SDK for Node.js is to use the [npm](http://npmjs.org) package manager for Node.js. Simply type the following into a terminal window:
```sh
npm install https://github.com/cashfree/cashfree-sdk-nodejs
```

## Getting Started
### Pre-requisites
  - A [Cashfree Merchant Account](https://merchant.cashfree.com/merchant/sign-up)
  - API keys for different products. You can generate them from your Dashboard
### IP Whitelisting and dynamic IPs
Your IP has to be whitelisted to hit Cashfree's server. Or if you have a dynamic IP please pass in the public key parameter during the init method as shown below. For more information please go [here](https://dev.cashfree.com/development/quickstart#ip-whitelisting).
## Usage
### Payouts
The package needs to be configured with your account's secret key which is available in your Cashfree Dashboard.
###### In case of static IP (Your IP is whitelisted)
```js
const Cashfree = require("cashfree-sdk");

//Initialize Cashfree Payout
let Payouts = Cashfree.Payouts;
Payouts.Init({
    "ENV": "TEST", 
    "ClientID": "CLIENTID",
    "ClientSecret": "CLIENTSECRET"
});
```
#
###### In case of dynamic IP you will need a public key to generate a signature(which will be done by sdk itself)
```js
const Cashfree = require("cashfree-sdk");

//Initialize Cashfree Payout
let Payouts = Cashfree.Payouts;
Payouts.Init({
    "ENV": "TEST", 
    "ClientID": "CLIENTID",
    "ClientSecret": "CLIENTSECRET",
    "PathToPublicKey": "/path/to/your/public/key/file.pem",
    //"PublicKey": "ALTERNATIVE TO SPECIFYING PATH (DIRECTLY PASTE PublicKey)"
});
```
| Option              | Default                       | Description                                                                           |
| ------------------- | ----------------------------- | ------------------------------------------------------------------------------------- |
| `ENV`        | `TEST`                        | Environment to be initialized. Can be set to `TEST` or `PRODUCTION` |
| `ClientID` | ``                             | `ClientID` which can be generated on cashfree dashboard.                  |
| `ClientSecret`         | ``                        | `ClientSecret` which can be found alongside generated `ClientID`.                        |
| `PathToPublicKey`         | ``                        | Either specify the path to your `.pem` public key file or use `PublicKey` Param and pass the key there.                        |
| `PublicKey`         | ``                        | Pass your Public Key to this parameter as an alternative to `PathToPublicKey`.                        |


### WebHook Verification

To verify the webhook received from Cashfree for different events and accept the webhook only when it returns `true`.

#### Usage
Pass the webhook received along with the payload type.

```js
Cashfree.Payouts.VerifySignature(webhookPostDataJson) // returns true or false
```


### Using Promises
Every method returns a promise which can be used:
```js
Payouts.Beneficiary.Add({
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
}).then(function(res){
	console.log(res)
});
```

### Using Async/Await
Can also be used synchronously using async/await:

```js
var syncCall = async function (){
	var res = await Payouts.Beneficiary.Add({
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
	});
	return res;
}
syncCall();
```
- For more information about the APIs go to [Payouts](Payouts).
- Complete list of [APIs](https://docs.cashfree.com/docs/payout/guide/#fetch-beneficiary-id).
### TODO
- #### PG
- #### Market Place
- #### Autocollect
