const { TRANSACTIONS_REL_URL } = require('../constants');

function Transactions() {
    return {
        fetchTransactions: async (data = {}) => {
            try {
                // make request
                const res = await this.doPost({
                    url: TRANSACTIONS_REL_URL,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    data,
                });
                return res;
            } catch (e) {
                return {
                    status: 'ERROR',
                    reason: e && e.message || 'Something went wrong',
                };
            }
        }
    };
};

module.exports = Transactions;