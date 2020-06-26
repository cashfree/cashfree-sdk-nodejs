const { checkKeysInObject } = require('../../utils');
const {
  REQUEST_TRANSFER,
  ASYNC_REQUEST_TRANSFER,
  GET_TRANSFER_STATUS,
  GET_TRANSFERS,
  REQUEST_BATCH_TRANSFER,
  GET_BATCH_TRANSFER_STATUS,
} = require('../constants');

class Transfers {
  constructor(api, auth) {
    this.api = api;
    this.auth = auth;
  }

  async requestTransfer(data) {
    let bearerToken;

    try {
      bearerToken = await auth.checkToken();
    } catch (e) {
      throw e;
    }

    const requiredParams = ['beneId', 'amount', 'transferId'];

    const isValid = checkKeysInObject(data, requiredParams);

    if (!isValid) {
      throw new Error('Bad request!');
    }

    const path = REQUEST_TRANSFER;

    const obj = {
      path,
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
      data,
    };

    try {
      const result = await api.post(obj);
      return result;
    } catch (e) {
      throw e;
    }
  }

  async requestAsyncTransfer(data) {
    let bearerToken;

    try {
      bearerToken = await auth.checkToken();
    } catch (e) {
      throw e;
    }

    const requiredParams = ['beneId', 'amount', 'transferId'];

    const isValid = checkKeysInObject(data, requiredParams);

    if (!isValid) {
      throw new Error('Bad request!');
    }

    var path = ASYNC_REQUEST_TRANSFER;

    const obj = {
      path,
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
      data,
    };

    try {
      const result = await api.post(obj);
      return result;
    } catch (e) {
      throw e;
    }
  }

  async getTransferStatus(data) {
    let bearerToken;

    try {
      bearerToken = await auth.checkToken();
    } catch (e) {
      throw e;
    }

    let params = '?';

    if (data.referenceId) {
      params += 'referenceId=' + encodeURIComponent(data.referenceId);
    }

    if (data.transferId) {
      if (params !== '?') params += '&';
      params += 'transferId=' + encodeURIComponent(data.transferId);
    }

    const path = GET_TRANSFER_STATUS + params;

    const obj = {
      path,
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
      data,
    };

    try {
      const result = await api.get(obj);
      return result;
    } catch (e) {
      throw e;
    }
  }

  async getTransfers(data) {
    let bearerToken;

    try {
      bearerToken = await auth.checkToken();
    } catch (e) {
      throw e;
    }

    let params = '?';

    if (data.maxReturn) {
      params += 'maxReturn=' + encodeURIComponent(data.maxReturn);
    }

    if (data.lastReturnId) {
      if (params != '?') params += '&';
      params += 'lastReturnId=' + encodeURIComponent(data.lastReturnId);
    }

    if (data.date) {
      if (params != '?') params += '&';
      params += 'date=' + encodeURIComponent(data.date);
    }

    const path = GET_TRANSFERS + params;

    const obj = {
      path,
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
      data,
    };

    try {
      const result = await api.get(obj);
      return result;
    } catch (e) {
      throw e;
    }
  }

  async requestBatchTransfer(data) {
    let bearerToken;

    try {
      bearerToken = await auth.checkToken();
    } catch (e) {
      throw e;
    }

    const requiredParams = ['batchFormat', 'batchTransferId', 'batch'];

    const isValid = checkKeysInObject(data, requiredParams);

    if (!isValid) {
      throw new Error('Bad request!');
    }

    let requiredParamsForBatch;

    if (data.batchFormat === 'BANK_ACCOUNT') {
      requiredParamsForBatch = [
        'amount',
        'transferId',
        'name',
        'email',
        'phone',
        'bankAccount',
        'ifsc',
      ];
    } else if (data.batchFormat === 'BENEFICIARY_ID') {
      requiredParamsForBatch = ['beneId', 'amount', 'transferId'];
    }

    const areParamsValidForBatch = checkKeysInObject(
      data.batch[0],
      requiredParamsForBatch,
    );

    if (!areParamsValidForBatch) {
      throw new Error('Bad request!');
    }

    const path = REQUEST_BATCH_TRANSFER;

    const obj = {
      path,
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
      data,
    };

    try {
      const result = await api.post(obj);
      return result;
    } catch (e) {
      throw e;
    }
  }

  async getBatchTransferStatus(data) {
    let bearerToken;

    try {
      bearerToken = await auth.checkToken();
    } catch (e) {
      throw e;
    }

    const requiredParams = ['batchTransferId'];

    const isValid = checkKeysInObject(data, requiredParams);

    if (!isValid) {
      throw new Error('Bad request!');
    }

    let params = '?';
    params += 'batchTransferId=' + encodeURIComponent(data.batchTransferId);

    const path = GET_BATCH_TRANSFER_STATUS + params;

    const obj = {
      path,
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
      data,
    };

    try {
      const result = await api.get(obj);
      return result;
    } catch (e) {
      throw e;
    }
  }
}

module.exports = Transfers;
