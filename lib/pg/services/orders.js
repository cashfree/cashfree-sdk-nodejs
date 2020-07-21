const {
  ORDER_CREATE,
  ORDER_GET_LINK,
  ORDER_GET_DETAILS,
  ORDER_GET_STATUS,
  ORDER_EMAIL,
} = require('../constants');

class Orders {
  constructor(api) {
    this.api = api;
  }

  async createOrders(data) {
    try {
      const result = await this.api.post({
        path: ORDER_CREATE,
        data,
      });
      return result;
    } catch (e) {
      return {
        status: 'ERROR',
        message: (e && e.message) || 'Something went wrong',
      };
    }
  }

  async getLink(data) {
    try {
      const result = await this.api.post({
        path: ORDER_GET_LINK,
        data,
      });
      return result;
    } catch (e) {
      return {
        status: 'ERROR',
        message: (e && e.message) || 'Something went wrong',
      };
    }
  }

  async getDetails(data) {
    try {
      const result = await this.api.post({
        path: ORDER_GET_DETAILS,
        data,
      });
      return result;
    } catch (e) {
      return {
        status: 'ERROR',
        message: (e && e.message) || 'Something went wrong',
      };
    }
  }

  async getStatus(data) {
    try {
      const result = await this.api.post({
        path: ORDER_GET_STATUS,
        data,
      });
      return result;
    } catch (e) {
      return {
        status: 'ERROR',
        message: (e && e.message) || 'Something went wrong',
      };
    }
  }

  async triggerPaymentEmail(data) {
    try {
      const result = await this.api.post({
        path: ORDER_EMAIL,
        data,
      });
      return result;
    } catch (e) {
      return {
        status: 'ERROR',
        message: (e && e.message) || 'Something went wrong',
      };
    }
  }
}

module.exports = Orders;
