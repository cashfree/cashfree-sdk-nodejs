const { doPost } = require('../../utils');
const {
    PG_REL_URL,
    PG_API_VERSION,
    ORDER_REFUND_REL_URL,
    REFUNDS_REL_URL,
    REFUND_STATUS_REL_URL,
} = require('../constants');

function Refunds() {
    const { baseUrl: hostname, appId, secretKey } = this;
    return {
        InitiateRefund: async (data = {}) => {
            try {
                // make request
                const res = await doPost({
                    hostname,
                    path: `${PG_REL_URL}${PG_API_VERSION}${ORDER_REFUND_REL_URL}`,
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
        FetchAllRefunds: async (data = {}) => {
            try {
                // make request
                const res = await doPost({
                    hostname,
                    path: `${PG_REL_URL}${PG_API_VERSION}${REFUNDS_REL_URL}`,
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
        FetchSingleRefund: async (data = {}) => {
            try {
                // make request
                const res = await doPost({
                    hostname,
                    path: `${PG_REL_URL}${PG_API_VERSION}${REFUND_STATUS_REL_URL}`,
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

module.exports = Refunds;