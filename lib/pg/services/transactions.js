const { TRANSACTIONS } = require('../constants');

class Transactions {
  constructor(api) {
    this.api = api;
  }

  async fetchTransactions(data) {
    try {
      const result = await this.api.post({
        path: TRANSACTIONS,
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

module.exports = Transactions;
