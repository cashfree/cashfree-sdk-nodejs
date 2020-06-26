const { checkKeysInObject } = require('../../utils');
const {
  BENEFICIARY_ADD,
  BENEFICIARY_GET_BY_ID,
  BENEFICIARY_GET_ID_BY_BANK_DETAILS,
  BENEFICIARY_REMOVE,
} = require('../constants');

class Beneficiary {
  constructor(api, auth) {
    this.api = api;
    this.auth = auth;
  }

  async add(data) {
    let bearerToken;

    try {
      bearerToken = await auth.checkToken();
    } catch (e) {
      throw e;
    }

    const requiredParams = ['beneId', 'name', 'email', 'phone', 'address1'];

    const isValid = checkKeysInObject(data, requiredParams);

    if (!isValid) {
      throw new Error('Bad request!');
    }

    const path = BENEFICIARY_ADD;

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

  async getById(data) {
    let bearerToken;

    try {
      bearerToken = await auth.checkToken();
    } catch (e) {
      throw e;
    }

    const requiredParams = ['beneId'];

    const isValid = checkKeysInObject(data, requiredParams);

    if (!isValid) {
      throw new Error('Bad request!');
    }

    const path = BENEFICIARY_GET_BY_ID + encodeURIComponent(data.beneId);

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

  async getIdByBankDetails(data) {
    let bearerToken;

    try {
      bearerToken = await auth.checkToken();
    } catch (e) {
      throw e;
    }

    const requiredParams = ['bankAccount', 'ifsc'];

    const isValid = checkKeysInObject(data, requiredParams);

    if (!isValid) {
      throw new Error('Bad request!');
    }

    let params = '?';
    params += 'bankAccount=' + encodeURIComponent(data.bankAccount);
    params += '&ifsc=' + encodeURIComponent(data.ifsc);

    const path = BENEFICIARY_GET_ID_BY_BANK_DETAILS + params;

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

  async remove(data) {
    let bearerToken;

    try {
      bearerToken = await auth.checkToken();
    } catch (e) {
      throw e;
    }

    const requiredParams = ['beneId'];

    const isValid = checkKeysInObject(data, requiredParams);

    if (!isValid) {
      throw new Error('Bad request!');
    }

    const path = BENEFICIARY_REMOVE;

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
}

module.exports = Beneficiary;
