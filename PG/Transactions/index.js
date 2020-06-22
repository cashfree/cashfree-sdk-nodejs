const { doPost } = require('../../utils');
const {
    PG_REL_URL,
    PG_API_VERSION,
    TRANSACTIONS_REL_URL,
} = require('../constants');

function Transactions() {
    const { baseUrl: hostname, appId, secretKey } = this;
    return {
        FetchTransactions: async (data = {}) => {
            try {
                // make request
                const res = await doPost({
                    hostname,
                    path: `${PG_REL_URL}${PG_API_VERSION}${TRANSACTIONS_REL_URL}`,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    data: {
                        appId,
                        secretKey,
                        ...data,
                    },
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