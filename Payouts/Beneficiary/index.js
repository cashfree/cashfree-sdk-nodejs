//Beneficiary main
var Utils = require("../../utils")
var PayoutConstants = require("../constants.js")


let Add =  function(req) {
	return new Promise(async (resolve, reject) => {
		try {
			await PayoutConstants.checkToken();
		} catch (error) {
			return resolve(error);
		}

	    var requiredParams = ["beneId", "name", "email", "phone", "address1"];
	    var checkParams = Utils.checkKeysInObject(req, requiredParams)
	    if(checkParams !== true) {
	    	return resolve (checkParams);
	    }

	    var path = "/payout/v1/addBeneficiary";
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
	    		response = Utils.doPost(obj);
	    	}
			return resolve(response);
		} catch (error) {
			return resolve(error);
		}
    });
}

let CreateGroup = function(req) {
	return new Promise(async (resolve, reject) => {
		try {
			await PayoutConstants.checkToken();
		} catch (error) {
			return resolve(error);
		}
		
		var requiredParams = ["group"];
		var checkParams = Utils.checkKeysInObject(req, requiredParams);
		if (checkParams != true) {
			return resolve (checkParams);
		}

		var path = "/payout/v1/createGroup";
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
	    		response = Utils.doPost(obj);
	    	}
			return resolve(response);
		} catch (error) {
			return resolve(error);
		}
	});
}

let GetDetails = function(req){
	return new Promise(async (resolve, reject) => {
		try {
			await PayoutConstants.checkToken();
		} catch (error) {
			return resolve(error);
		}
		
		var requiredParams = ["beneId"];
		var checkParams = Utils.checkKeysInObject(req, requiredParams);
		if (checkParams != true) {
			return resolve (checkParams);
		}

		var path = "/payout/v1/getBeneficiary/"+req.beneId;
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
	    		response = Utils.doGet(obj);
	    	}
			return resolve(response);
		} catch (error) {
			return resolve(error);
		}
	});
}

let GetBeneId = function(req){
	return new Promise(async (resolve, reject) => {
		try {
			await PayoutConstants.checkToken();
		} catch (error) {
			return resolve(error);
		}
		
		var requiredParams = ["bankAccount", "ifsc"];
		var checkParams = Utils.checkKeysInObject(req, requiredParams);
		if (checkParams != true) {
			return resolve (checkParams);
		}

		var params = "?";
		params += "bankAccount="+req.bankAccount;
		params += "&ifsc="+req.ifsc;

		var path = "/payout/v1/getBeneId"+params;
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
	    		response = Utils.doGet(obj);
	    	}
			return resolve(response);
		} catch (error) {
			return resolve(error);
		}
	});
}

let Remove = function(req) {
	return new Promise(async (resolve, reject) => {
		try {
			await PayoutConstants.checkToken();
		} catch (error) {
			return resolve(error);
		}
		
		var requiredParams = ["beneId"];
		var checkParams = Utils.checkKeysInObject(req, requiredParams);
		if (checkParams != true) {
			return resolve (checkParams);
		}

		var path = "/payout/v1/removeBeneficiary";
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
	    		response = Utils.doPost(obj);
	    	}
			return resolve(response);
		} catch (error) {
			return resolve(error);
		}
	});
}

module.exports = {Add, CreateGroup, GetDetails, GetBeneId, Remove};
