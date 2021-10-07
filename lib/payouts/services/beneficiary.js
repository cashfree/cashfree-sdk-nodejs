const { checkKeysInObject } = require('../../utils');
const {
  BENEFICIARY_ADD,
  BENEFICIARY_GET_BY_ID,
  BENEFICIARY_GET_ID_BY_BANK_DETAILS,
  BENEFICIARY_REMOVE,
  BENEFICIARY_HISTORY
} = require('../constants');

class Beneficiary {
  constructor(api, auth) {
    this.api = api;
    this.auth = auth;
  }

  async add(data) {
    let bearerToken;

    try {
      bearerToken = await this.auth.checkToken();
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
      const result = await this.api.post(obj);
      return result;
    } catch (e) {
      throw e;
    }
  }

  async getById(data) {
    let bearerToken;

    try {
      bearerToken = await this.auth.checkToken();
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
      const result = await this.api.get(obj);
      return result;
    } catch (e) {
      throw e;
    }
  }

  async getIdByBankDetails(data) {
    let bearerToken;

    try {
      bearerToken = await this.auth.checkToken();
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
      const result = await this.api.get(obj);
      return result;
    } catch (e) {
      throw e;
    }
  }

  async remove(data) {
    let bearerToken;

    try {
      bearerToken = await this.auth.checkToken();
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
      const result = await this.api.post(obj);
      return result;
    } catch (e) {
      throw e;
    }
  }

  async getHistory(data){
    let bearerToken;

    try {
      bearerToken = await this.auth.checkToken();
    } catch (e) {
      throw e;
    }

    const requiredParams = ['beneId'];

    const isValid = checkKeysInObject(data, requiredParams);

    if (!isValid) {
      throw new Error('Bad request!');
    }
    let {startDate, endDate, perPage, page} = data;
    if(startDate){
      startDate = new Date(startDate).toISOString().substring(0,10);
      if(endDate){
        endDate = new Date(data.endDate).toISOString().substring(0,10);
      }
      else{
        endDate = new Date(new Date().getTime() - (24*60*60*1000)).toISOString().substring(0,10);
      }
    }
    
    let path = BENEFICIARY_HISTORY + "?beneId=" + encodeURIComponent(data.beneId);

    if(startDate && perPage && page)
      path += "&startDate=" + encodeURIComponent(startDate) + "&endDate=" + encodeURIComponent(endDate) + "&perPage=" + encodeURIComponent(perPage) + "&page=" + encodeURIComponent(page);
    else if(startDate && perPage)
      path += "&startDate=" + encodeURIComponent(startDate) + "&endDate=" + encodeURIComponent(endDate) + "&perPage=" + encodeURIComponent(perPage);
    else if(startDate && page)
      path += "&startDate=" + encodeURIComponent(startDate) + "&endDate=" + encodeURIComponent(perPage) + "&page=" + encodeURIComponent(page);
    else if(perPage && page)
      path += "&perPage=" + encodeURIComponent(perPage) + "&page=" + encodeURIComponent(page);
    else if(startDate)
      path += "&startDate=" + encodeURIComponent(startDate) + "&endDate=" + encodeURIComponent(endDate);
    else if(perPage)
      path += "&perPage=" + encodeURIComponent(perPage);
    else if(page)
      path += "&page=" + encodeURIComponent(page);
      
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

module.exports = Beneficiary;
