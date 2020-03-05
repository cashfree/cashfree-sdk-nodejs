const { doPost } = require('../../utils');
const { getPGConfig } = require('../config');
const {
    PG_REL_URL,
    PG_API_VERSION,
    TRANSACTIONS_REL_URL,
} = require('../constants');

const FetchTransactions = async (data = {}) => {
    try {
        const pgConfig = getPGConfig();
        // make request
        const res = await doPost({
            hostname: pgConfig.baseUrl,
            path: `${PG_REL_URL}${PG_API_VERSION}${TRANSACTIONS_REL_URL}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: {
                appId: pgConfig.appId,
                secretKey: pgConfig.secretKey,
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

module.exports = {
    FetchTransactions,
};