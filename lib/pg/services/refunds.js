const { ORDER_REFUND, REFUNDS, REFUND_STATUS } = require('../constants');

class Refunds {
  constructor(api) {
    this.api = api;
  }

  async initiateRefund(data) {
    try {
      const result = await this.api.post({
        path: ORDER_REFUND,
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

  async fetchAllRefunds(data) {
    try {
      const result = await this.api.post({
        path: REFUNDS,
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

  async fetchSingleRefund(data) {
    try {
      const result = await this.api.post({
        path: REFUND_STATUS,
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

module.exports = Refunds;
