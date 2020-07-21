const { checkKeysInObject } = require('../../utils');
const {
  CASHGRAM_CREATE,
  CASHGRAM_GET_STATUS,
  CASHGRAM_DEACTIVATE,
} = require('../constants');

class Cashgram {
  constructor(api, auth) {
    this.api = api;
    this.auth = auth;
  }

  async create(data) {
    let bearerToken;

    try {
      bearerToken = await this.auth.checkToken();
    } catch (e) {
      throw e;
    }

    const requiredParams = [
      'cashgramId',
      'amount',
      'name',
      'phone',
      'linkExpiry',
    ];

    const isValid = checkKeysInObject(data, requiredParams);

    if (!isValid) {
      throw new Error('Bad request!');
    }

    const path = CASHGRAM_CREATE;

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

  async getStatus(data) {
    let bearerToken;

    try {
      bearerToken = await this.auth.checkToken();
    } catch (e) {
      throw e;
    }

    const requiredParams = ['cashgramId'];

    const isValid = checkKeysInObject(data, requiredParams);

    if (!isValid) {
      throw new Error('Bad request!');
    }

    let params = '?';
    params += 'cashgramId=' + encodeURIComponent(data.cashgramId);

    const path = CASHGRAM_GET_STATUS + params;

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

  async deactivate(data) {
    let bearerToken;

    try {
      bearerToken = await this.auth.checkToken();
    } catch (e) {
      throw e;
    }

    const requiredParams = ['cashgramId'];

    const isValid = checkKeysInObject(data, requiredParams);

    if (!isValid) {
      throw new Error('Bad request!');
    }

    const path = CASHGRAM_DEACTIVATE;

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
}

module.exports = Cashgram;
