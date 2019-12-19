//Payout constatns
const Utils = require('../utils');


let MPAEndpoint = "payout-gamma.cashfree.com";
let BearerToken = '';
let Expiry = '';
let ClientID = '';
let ClientSecret = '';

let initialize = function(env){
    if(env == "PRODUCTION") this.MPAEndpoint = "https://payout-api.cashfree.com"
}

let setClientId = function(v){
	this.ClientID = v;
}

let setClientSecret = function(v){
	this.ClientSecret = v;
}

let authorize =  async function(){
	var path = "/payout/v1/authorize";
	var data = {};
	var obj = {};
	obj.headers = {
        "Content-Type": 'application/json',
        "X-Client-Id": this.ClientID,
        "X-Client-Secret": this.ClientSecret
	};
	obj.path = path;
	obj.hostname = this.MPAEndpoint;
	obj.data = data;
	var response = await Utils.doPost(obj);
	if(response.status == "SUCCESS"){
		this.BearerToken = response.data.token;
		this.Expiry = parseInt(response.data.expiry);
	} else {
		return response;
	}
}

let checkToken = async function(){
	var timeBuffer = 300;
	var response = true;
	if(this.BearerToken == "" || this.Expiry == "" || (this.Expiry-timeBuffer) < Date.now()/1000){
		response = await this.authorize();
	}
	return response;
}

module.exports = {MPAEndpoint, initialize, BearerToken, Expiry, setClientId, ClientID, ClientSecret, checkToken, setClientSecret, authorize};
