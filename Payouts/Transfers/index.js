var Utils = require("../../utils")
var PayoutConstants = require("../constants.js")


let RequestTransfer = function(req) {
	return new Promise(async (resolve, reject) => {
		try {
			await PayoutConstants.checkToken();
		} catch (error) {
			return resolve(error);
		}
		
		var requiredParams = ["beneId", "amount", "transferId"];
		var checkParams = Utils.checkKeysInObject(req, requiredParams);
		if (checkParams != true) {
			return resolve (checkParams);
		}

		var path = "/payout/v1/requestTransfer";
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

let GetTransferStatus = function(req) {
	return new Promise(async (resolve, reject) => {
		try {
			await PayoutConstants.checkToken();
		} catch (error) {
			return resolve(error);
		}

		var params = "?";
		if (req.referenceId) {
			params += "referenceId="+req.referenceId;
		}
		if (req.transferId) {
			if (params != "?") params += "&"
			params += "transferId="+req.transferId;
		}

		var path = "/payout/v1/getTransferStatus"+params;
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

let GetTransfers = function(req) {
	return new Promise(async (resolve, reject) => {
		try {
			await PayoutConstants.checkToken();
		} catch (error) {
			return resolve(error);
		}
		var params = "?"
		if (req.maxReturn) {
			params += "maxReturn="+req.maxReturn;
		}
		if (req.lastReturnId) {
			if (params != "?") params += "&"
			params += "lastReturnId="+req.lastReturnId;
		}
		if (req.date) {
			if (params != "?") params += "&"
			params += "date="+req.date;
		}
		var path = "/payout/v1/getTransfers"+params;
		console.log(path);
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

let RequestBatchTransfer = function(req) {
	return new Promise(async (resolve, reject) => {
		try {
			await PayoutConstants.checkToken();
		} catch (error) {
			return resolve(error);
		}
		var requiredParamsBatch = ["batchFormat", "batchTransferId", "batch"];
		var checkParamsBatch = Utils.checkKeysInObject(req, requiredParamsBatch);
		if (checkParamsBatch != true) {
			return resolve(checkParamsBatch);
		}

		var requiredParams;
		if (req.batchFormat == "BANK_ACCOUNT") {
			requiredParams = ["amount", "transferId", "name", "email", "phone", "bankAccount", "ifsc"];
		} else if (req.batchFormat == "BENEFICIARY_ID") {
			requiredParams = ["beneId", "amount", "transferId"];
		}

		var checkParams = Utils.checkKeysInObject(req.batch[0], requiredParams);
		if (checkParams != true) {
			return resolve (checkParams);
		}

		var path = "/payout/v1/requestBatchTransfer";
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

let GetBatchTransferStatus = function(req) {
	return new Promise(async (resolve, reject) => {
		try {
			await PayoutConstants.checkToken();
		} catch (error) {
			return resolve(error);
		}
		
		var requiredParams = ["batchTransferId"];
		var checkParams = Utils.checkKeysInObject(req, requiredParams);
		if (checkParams != true) {
			return resolve (checkParams);
		}

		var params = "?";
		params += "batchTransferId="+req.batchTransferId;

		var path = "/payout/v1/getBatchTransferStatus"+params;
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


module.exports = {GetBatchTransferStatus, RequestBatchTransfer, RequestTransfer, GetTransferStatus, GetTransfers}