var Utils = require("../utils")
var PayoutConstants = require("./constants")
var crypto = require("crypto")


let VerifySignature = function (postData) {
	if (postData != null && postData.signature !== undefined) {
		var keys = Object.keys(postData);
		var signature = postData.signature;
		keys.sort();
		var signatureData = "";

		keys.forEach((key)=>{
			if (key != "signature") {
				signatureData += postData[key];
			}
		});
		
		var computedSignature = crypto.createHmac('sha256', PayoutConstants.ClientSecret).update(signatureData).digest('base64');

		if (computedSignature == signature) {
			return true
		}
		return false
	} else {
		return false;
	}
}

module.exports = {VerifySignature}