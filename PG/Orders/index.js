const {
    ORDER_CREATE_REL_URL,
    ORDER_GET_LINK_REL_URL,
    ORDER_GET_DETAILS_REL_URL,
    ORDER_GET_STATUS_REL_URL,
    ORDER_EMAIL_REL_URL,
} = require('../constants');

function Orders() {
    return {
        CreateOrders: async (data = {}) => {
            try {
                // make request
                const res = await this.doPost({
                    url: ORDER_CREATE_REL_URL,
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
        },
        GetLink: async (data = {}) => {
            try {
                // make request
                const res = await this.doPost({
                    url: ORDER_GET_LINK_REL_URL,
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
        },

        GetDetails: async (data = {}) => {
            try {
                // make request
                const res = await this.doPost({
                    url: ORDER_GET_DETAILS_REL_URL,
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
        },

        GetStatus: async (data = {}) => {
            try {
                // make request
                const res = await this.doPost({
                    url: ORDER_GET_STATUS_REL_URL,
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
        },

        TriggerPaymentEmail: async (data = {}) => {
            try {
                // make request
                const res = await this.doPost({
                    url: ORDER_EMAIL_REL_URL,
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
    }
};

module.exports = Orders;