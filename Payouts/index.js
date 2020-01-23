//Payouts main
let Utils = require('../utils')
let {SelfWithdrawal, GetBalance} = require("./Common.js")
let Beneficiary = require('./Beneficiary')
let Transfers = require('./Transfers')
let Validation = require('./Validation')
let Cashgram = require('./Cashgram')
let PayoutConstants = require('./constants')
let {VerifySignature} = require('./SignatureVerification')


let ENV = "TEST";

let SetEnv = function(en){
    PayoutConstants.initialize(en)
}

let Init = async function(initObj) {
    SetEnv(initObj.ENV)
    if (!initObj.ClientID || !initObj.ClientSecret) {
    	console.log("Cashfree: ClientID or ClientSecret not defined")
    } else {
    	PayoutConstants.setClientId(initObj.ClientID)
        PayoutConstants.setClientSecret(initObj.ClientSecret)
    }
    if (!initObj.PublicKey && !initObj.PathToPublicKey) {
    	console.log("Cashfree: PublicKey not defined, make sure your IP is whitelisted")
    } else {
        PayoutConstants.setPublicKey(initObj.PublicKey, initObj.PathToPublicKey)
    }
}

module.exports = {Beneficiary, SetEnv, Init, Transfers, SelfWithdrawal, GetBalance, Validation, Cashgram, VerifySignature};
