//Cashfree Main
let Payouts = require('./Payouts')
let ENV = "TEST";

let SetEnv = function(en){
    if(en) this.ENV = en;
    console.log("Cashfree: " + this.ENV);
    PayoutConstants.initialize(this.ENV)
}

let Init = function(initObj){
	if(initObj.Payouts !== undefined){
		Payouts.Init(initObj.Payouts)
	}
}

module.exports = {Payouts, SetEnv, Init};
