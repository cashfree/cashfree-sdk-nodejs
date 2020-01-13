//Payout constatns
const Utils = require('../utils');
const constants = require('constants');
var fs = require("fs")
var crypto = require("crypto")

let MPAEndpoint = "payout-gamma.cashfree.com";
let BearerToken = '';
let Expiry = '';
let ClientID = '';
let ClientSecret = '';
let PublicKey = '';

let initialize = function(env){
    if(env == "PRODUCTION") this.MPAEndpoint = "payout-api.cashfree.com";
}

let setClientId = function(v){
	this.ClientID = v;
}

let setClientSecret = function(v){
	this.ClientSecret = v;
}

let setPublicKey = function(key, path) {
	if (path) {
		this.PublicKey = fs.readFileSync(path,'utf8')
	} else {
		this.PublicKey = key;
	}
} 

let generateCertificate = function() {
    var curTimeStamp = Date.now()/1000;
    var message = this.ClientID + "." + curTimeStamp.toString();
    let buffer = new Buffer(message);
    let encrypted = crypto.publicEncrypt({
        key: this.PublicKey,
        padding: constants.RSA_PKCS1_OAEP_PADDING
    }, buffer);
    return encrypted.toString("base64");
}

let authorize =  async function(){
	var path = "/payout/v1/authorize";
	var data = {};
	var obj = {};
	try {
		var certificate = this.generateCertificate();
	} catch(error) {
		throw {
			"status": "ERROR", 
			"message": "Couldn't generate certificate"
		}
	}
	obj.headers = {
        "Content-Type": 'application/json',
        "X-Client-Id": this.ClientID,
        "X-Client-Secret": this.ClientSecret,
        "X-Cf-Signature": certificate
	};
	obj.path = path;
	obj.hostname = this.MPAEndpoint;
	obj.data = data;
	try {
		var response = await Utils.doPost(obj);
	} catch(error) {
		throw error;
	}
	if(response.status == "ERROR"){
		throw response;
	}
	this.BearerToken = response.data.token;
	this.Expiry = parseInt(response.data.expiry);
	return response
}

let checkToken = async function(){
	var timeBuffer = 300;
	var response = true;
	if(this.BearerToken == "" || this.Expiry == "" || (this.Expiry-timeBuffer) < Date.now()/1000){
		try {
			response = await this.authorize();
		} catch(error) {
			throw error;
		}
	}
	if (response.status = "ERROR") {
		throw response;
	}
	return response;
}

module.exports = {MPAEndpoint, initialize, BearerToken, Expiry, setClientId, ClientID, ClientSecret, checkToken, setClientSecret, authorize, PublicKey, setPublicKey, generateCertificate};
