const { checkKeysInObject } = require('../../utils');
const {
  VALIDATE_BANK_DETAILS,
  ASYNC_VALIDATE_BANK_DETAILS,
  GET_BANK_VALIDATION_STATUS,
  VALIDATE_UPI_DETAILS,
  VALIDATE_BULK_BANK_ACTIVATION,
  GET_BULK_VALIDATION_STATUS,
} = require('../constants');

class Validation {
  constructor(api, auth) {
    this.api = api;
    this.auth = auth;
  }

  async validateBankDetails(data) {
    let bearerToken;

    try {
      bearerToken = await this.auth.checkToken();
    } catch (e) {
      throw e;
    }

    const requiredParams = ['name', 'phone', 'bankAccount', 'ifsc'];

    const isValid = checkKeysInObject(data, requiredParams);

    if (!isValid) {
      throw new Error('Bad request!');
    }

    let params = '?';
    params += 'name=' + encodeURIComponent(data.name);
    params += '&phone=' + encodeURIComponent(data.phone);
    params += '&bankAccount=' + encodeURIComponent(data.bankAccount);
    params += '&ifsc=' + encodeURIComponent(data.ifsc);

    const path = VALIDATE_BANK_DETAILS + params;

    const obj = {
      path,
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
      data,
    };

    try {
      const result = await this.api.get(obj);
      return result;
    } catch (e) {
      throw e;
    }
  }

  async validateBankDetailsAsync(data) {
    let bearerToken;

    try {
      bearerToken = await this.auth.checkToken();
    } catch (e) {
      throw e;
    }

    const requiredParams = ['name', 'phone', 'bankAccount', 'ifsc'];

    const isValid = checkKeysInObject(data, requiredParams);

    if (!isValid) {
      throw new Error('Bad request!');
    }

    let params = '?';
    params += 'name=' + encodeURIComponent(data.name);
    params += '&phone=' + encodeURIComponent(data.phone);
    params += '&bankAccount=' + encodeURIComponent(data.bankAccount);
    params += '&ifsc=' + encodeURIComponent(data.ifsc);

    const path = ASYNC_VALIDATE_BANK_DETAILS + params;

    const obj = {
      path,
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
      data,
    };

    try {
      const result = await this.api.get(obj);
      return result;
    } catch (e) {
      throw e;
    }
  }

  async bankValidationStatus(data) {
    let bearerToken;

    try {
      bearerToken = await this.auth.checkToken();
    } catch (e) {
      throw e;
    }

    const requiredParams = ['bvRefId'];

    const isValid = checkKeysInObject(data, requiredParams);

    if (!isValid) {
      throw new Error('Bad request!');
    }

    let params = '?';
    params += 'bvRefId=' + encodeURIComponent(data.bvRefId);

    const path = GET_BANK_VALIDATION_STATUS + params;

    const obj = {
      path,
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
      data,
    };

    try {
      const result = await this.api.get(obj);
      return result;
    } catch (e) {
      throw e;
    }
  }

  async validateUPIDetails(data) {
    let bearerToken;

    try {
      bearerToken = await this.auth.checkToken();
    } catch (e) {
      throw e;
    }

    const requiredParams = ['name', 'vpa'];

    const isValid = checkKeysInObject(data, requiredParams);

    if (!isValid) {
      throw new Error('Bad request!');
    }

    let params = '?';
    params += 'name=' + encodeURIComponent(data.name);
    params += '&vpa=' + encodeURIComponent(data.vpa);

    const path = VALIDATE_UPI_DETAILS + params;

    const obj = {
      path,
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
      data,
    };

    try {
      const result = await this.api.get(obj);
      return result;
    } catch (e) {
      throw e;
    }
  }

  async validateBulkBankActivation(data) {
    let bearerToken;

    try {
      bearerToken = await this.auth.checkToken();
    } catch (e) {
      throw e;
    }

    const requiredParams = ['bulkValidationId', 'entries'];

    const isValid = checkKeysInObject(data, requiredParams);

    if (!isValid) {
      throw new Error('Bad request!');
    }

    const requiredEntriesParams = ['name', 'phone', 'bankAccount', 'ifsc'];
    const areEntriesValid = checkKeysInObject(
      data.entries[0],
      requiredEntriesParams,
    );

    if (!areEntriesValid) {
      throw new Error('Bad request!');
    }

    const path = VALIDATE_BULK_BANK_ACTIVATION;

    const obj = {
      path,
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
      data,
    };

    try {
      const result = await this.api.post(obj);
      return result;
    } catch (e) {
      throw e;
    }
  }

  async getBulkValidationStatus(data) {
    let bearerToken;

    try {
      bearerToken = await this.auth.checkToken();
    } catch (e) {
      throw e;
    }

    const requiredParams = ['bulkValidationId'];

    const isValid = checkKeysInObject(data, requiredParams);

    if (!isValid) {
      throw new Error('Bad request!');
    }

    let params = '?';
    params += 'batchTransferId=' + data.batchTransferId;
    params += '&bankAccount=' + encodeURIComponent(data.bankAccount);
    params += '&ifsc=' + encodeURIComponent(data.ifsc);

    const path = GET_BULK_VALIDATION_STATUS + params;

    const obj = {
      path,
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
      data,
    };

    try {
      const result = await this.api.get(obj);
      return result;
    } catch (e) {
      throw e;
    }
  }
}

module.exports = Validation;
