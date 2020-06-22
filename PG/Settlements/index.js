const { doPost } = require('../../utils');
const {
    PG_REL_URL,
    PG_API_VERSION,
    SETTLEMENTS_REL_URL,
    SETTLEMENT_REL_URL,
} = require('../constants');


function Settlements() {
    const { baseUrl: hostname, appId, secretKey } = this;
    return {
        FetchAllSettlements: async (data = {}) => {
            try {
                // make request
                const res = await doPost({
                    hostname,
                    path: `${PG_REL_URL}${PG_API_VERSION}${SETTLEMENTS_REL_URL}`,
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
        },
        FetchSingleSettlement: async (data = {}) => {
            try {
                // make request
                const res = await doPost({
                    hostname,
                    path: `${PG_REL_URL}${PG_API_VERSION}${SETTLEMENT_REL_URL}`,
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
}

module.exports = Settlements;