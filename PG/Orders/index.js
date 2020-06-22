const { doPost } = require('../../utils');
const {
    PG_REL_URL,
    PG_API_VERSION,
    ORDER_CREATE_REL_URL,
    ORDER_GET_LINK_REL_URL,
    ORDER_GET_DETAILS_REL_URL,
    ORDER_GET_STATUS_REL_URL,
    ORDER_EMAIL_REL_URL,
} = require('../constants');

function Orders() {
    const { baseUrl: hostname, appId, secretKey } = this;
    return {
        CreateOrders: async (data = {}) => {
            try {
                // make request
                const res = await doPost({
                    hostname,
                    path: `${PG_REL_URL}${PG_API_VERSION}${ORDER_CREATE_REL_URL}`,
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
        GetLink: async (data = {}) => {
            try {
                // make request
                const res = await doPost({
                    hostname,
                    path: `${PG_REL_URL}${PG_API_VERSION}${ORDER_GET_LINK_REL_URL}`,
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

        GetDetails: async (data = {}) => {
            try {
                // make request
                const res = await doPost({
                    hostname,
                    path: `${PG_REL_URL}${PG_API_VERSION}${ORDER_GET_DETAILS_REL_URL}`,
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

        GetStatus: async (data = {}) => {
            try {
                // make request
                const res = await doPost({
                    hostname,
                    path: `${PG_REL_URL}${PG_API_VERSION}${ORDER_GET_STATUS_REL_URL}`,
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

        TriggerPaymentEmail: async (data = {}) => {
            try {
                // make request
                const res = await doPost({
                    hostname,
                    path: `${PG_REL_URL}${PG_API_VERSION}${ORDER_EMAIL_REL_URL}`,
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
    }
};

module.exports = Orders;