var Utils = require("../utils")
var PayoutConstants = require("./constants")


let SelfWithdrawal = function(req) {
	return new Promise(async (resolve, reject) => {
		try {
			await PayoutConstants.checkToken();
		} catch (error) {
			return resolve(error);
		}
		var requiredParams = ["withdrawalId", "amount"];
		var checkParams = Utils.checkKeysInObject(req, requiredParams);
		if (checkParams != true) {
			return resolve (checkParams);
		}

		var path = "/payout/v1/selfWithdrawal";
		var obj = {};
		obj.headers = {
			"Content-Type": "application/json",
			"Authorization": "Bearer "+PayoutConstants.BearerToken
		};
		obj.path = path;
		obj.hostname = PayoutConstants.MPAEndpoint;
		obj.data = req;

		try {
			response = await Utils.doPost(obj);
			if (response.status == "ERROR" && response.subCode == "403") {
				await PayoutConstants.authorize();
				obj.headers.Authorization = "Bearer "+PayoutConstants.BearerToken;
	    		response = await Utils.doPost(obj);
	    	}
			return resolve(response);
		} catch (error) {
			return resolve(error);
		}
	});
}

let GetBalance = function(req) {
	return new Promise(async (resolve, reject) => {
		try {
			await PayoutConstants.checkToken();
		} catch (error) {
			return resolve(error);
		}
		var path = "/payout/v1/getBalance";
		var obj = {};
		obj.headers = {
			"Content-Type": "application/json",
			"Authorization": "Bearer "+PayoutConstants.BearerToken
		};
		obj.path = path;
		obj.hostname = PayoutConstants.MPAEndpoint;
		obj.data = req;

		try {
			response = await Utils.doGet(obj);
			if (response.status == "ERROR" && response.subCode == "403") {
				await PayoutConstants.authorize();
				obj.headers.Authorization = "Bearer "+PayoutConstants.BearerToken;
	    		response = await Utils.doGet(obj);
	    	}
			return resolve(response);
		} catch (error) {
			return resolve(error);
		}
	});
}

module.exports = {SelfWithdrawal, GetBalance};
