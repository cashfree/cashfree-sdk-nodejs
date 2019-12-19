## Payouts API GUIDE

Please refer to the [Cashfree Docs](https://docs.cashfree.com/docs/)  for the complete API reference.

### Beneficiary
Contains all APIs related to beneficiary.

- [Add Beneficiary](https://docs.cashfree.com/docs/payout/guide/#add-beneficiary)
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
    }).then(function(d){
	    console.log(d)
    });
    ```
- [Create Group](https://docs.cashfree.com/docs/payout/guide/#create-beneficiary-group)
    ```js
    Payouts.Beneficiary.CreateGroup({
    	"group" : "SALES", 
    	"description": "Sales department group"
    }).then(function(d){
    	console.log(d)
    });	
    ```
- [Get Beneficiary Details](https://docs.cashfree.com/docs/payout/guide/#get-beneficiary-details)
    ```js
    Payouts.Beneficiary.GetDetails({
    	"beneId": "JOHN18011"
    }).then(function(d){
    	console.log(d)
    });
    ```
- [Get Beneficiary Id](https://docs.cashfree.com/docs/payout/guide/#fetch-beneficiary-id)
    ```js
    Payouts.Beneficiary.GetBeneId({
    	bankAccount: "00001111222233",
	    ifsc: "HDFC0000001"
    }).then(function(d){
    	console.log(d)
    });
    ```
- [Remove Beneficiary](https://docs.cashfree.com/docs/payout/guide/#fetch-beneficiary-id)
    ```js
    
    ```