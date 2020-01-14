//Payouts main
let Utils = require('../utils')
let {SelfWithdrawal, GetBalance} = require("./Common.js")
let Beneficiary = require('./Beneficiary')
let Transfers = require('./Transfers')
let Validation = require('./Validation')
let Cashgram = require('./Cashgram')
let PayoutConstants = require('./constants')


let ENV = "TEST";

let SetEnv = function(en){
    PayoutConstants.initialize(en)
}

let Init = async function(initObj) {
	SetEnv(initObj.ENV)
	if (initObj.ClientID !== undefined && initObj.ClientSecret !== undefined && (initObj.PublicKey !== undefined || initObj.PathToPublicKey !== undefined)) {
		PayoutConstants.setClientId(initObj.ClientID)
		PayoutConstants.setClientSecret(initObj.ClientSecret)
		PayoutConstants.setPublicKey(initObj.PublicKey, initObj.PathToPublicKey)
	} else {
		console.log("ClientID or ClientSecret or PublicKey not defined")
	}
	if (initObj.PublicKey !== undefined || initObj.PathToPublicKey !== undefined) {
		PayoutConstants.setPublicKey(initObj.PublicKey, initObj.PathToPublicKey)
	} else {
		console.log("PublicKey not defined, make sure your IP is whitelisted")
	}
}

module.exports = {Beneficiary, SetEnv, Init, Transfers, SelfWithdrawal, GetBalance, Validation, Cashgram};
