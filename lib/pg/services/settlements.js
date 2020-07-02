const { SETTLEMENTS, SETTLEMENT } = require('../constants');

class Settlements {
  constructor(api) {
    this.api = api;
  }

  async fetchAllSettlements(data) {
    try {
      const result = await this.api.post({
        path: SETTLEMENTS,
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

  async fetchSettlementById(data) {
    try {
      const result = await this.api.post({
        path: SETTLEMENT,
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

module.exports = Settlements;
