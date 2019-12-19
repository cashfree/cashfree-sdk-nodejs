var Utils = require("../../utils")
var PayoutConstants = require("../constants.js")


let ValidateBankDetails = function(req) {//validateBankDetails (validation folder)
	return new Promise(async (resolve, reject) => {
		try {
			await PayoutConstants.checkToken();
		} catch (error) {
			return resolve(error);
		}

		var requiredParams = ["name", "phone", "bankAccount", "ifsc"];
		var checkParams = Utils.checkKeysInObject(req, requiredParams);
		if (checkParams != true) {
			return resolve (checkParams);
		}

		var params = "?"
		params += "name="+req.name;
		params += "&phone="+req.phone;
		params += "&bankAccount="+req.bankAccount;
		params += "&ifsc="+req.ifsc;

		var path = "/payout/v1/validation/bankDetails"+params;
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

let ValidateUPIDetails = function(req) { //validate
	return new Promise(async (resolve, reject) => {
		try {
			await PayoutConstants.checkToken();
		} catch (error) {
			return resolve(error);
		}

		var requiredParams = ["name", "vpa"];
		var checkParams = Utils.checkKeysInObject(req, requiredParams);
		if (checkParams != true) {
			return resolve (checkParams);
		}
		var params = "?"
		params += "name="+req.name
		params += "&vpa="+req.vpa;

		var path = "/payout/v1/validation/upiDetails?vpa="+req.vpa+"&name="+req.name;
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

let ValidateBulkBankActivation = function(req) {//validation
	return new Promise(async (resolve, reject) => {
		try {
			await PayoutConstants.checkToken();
		} catch (error) {
			return resolve(error);
		}
		
		var requiredParams = ["bulkValidationId", "entries"];
		var checkParams = Utils.checkKeysInObject(req, requiredParams);
		if (checkParams != true) {
			return resolve (checkParams);
		}

		var requiredParamsEntries = ["name", "phone", "bankAccount", "ifsc"];
		var checkParamsEntries = Utils.checkKeysInObject(req.entries[0], requiredParamsEntries);
		if (checkParamsEntries != true) {
			return resolve (checkParamsEntries);
		}

		var path = "/payout/v1/bulkValidation/bankDetails";
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

let GetBulkValidationStatus = function(req) {
	return new Promise(async (resolve, reject) => {
		try {
			await PayoutConstants.checkToken();
		} catch (error) {
			return resolve(error);
		}
		
		var requiredParams = ["bulkValidationId"];
		var checkParams = Utils.checkKeysInObject(req, requiredParams);
		if (checkParams != true) {
			return resolve (checkParams);
		}

		var params = "?";
		params += "batchTransferId="+req.batchTransferId;

		if (req.bankAccount) {
			params += "&bankAccount="+req.bankAccount;
		}
		if (req.ifsc) {
			params += "&ifsc="+req.ifsc;
		}

		var path = "/payout/v1/getBulkValidationStatus"+params;
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

module.exports = {ValidateBankDetails, ValidateUPIDetails, ValidateBulkBankActivation, GetBulkValidationStatus};