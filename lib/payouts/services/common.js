const { checkKeysInObject } = require('../../utils');
const { SELF_WITHDRAWAL, GET_BALANCE } = require('../constants');

class Common {
  constructor(api, auth) {
    this.api = api;
    this.auth = auth;
  }

  async selfWithdrawal(data) {
    let bearerToken;

    try {
      bearerToken = await auth.checkToken();
    } catch (e) {
      throw e;
    }

    const requiredParams = ['withdrawalId', 'amount'];

    const isValid = checkKeysInObject(data, requiredParams);

    if (!isValid) {
      throw new Error('Bad request!');
    }

    const path = SELF_WITHDRAWAL;

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

  async getBalance() {
    let bearerToken;

    try {
      bearerToken = await auth.checkToken();
    } catch (e) {
      throw e;
    }

    const path = GET_BALANCE;

    const obj = {
      path,
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    };

    try {
      const result = await api.get(obj);
      return result;
    } catch (e) {
      throw e;
    }
  }
}

module.exports = Common;
