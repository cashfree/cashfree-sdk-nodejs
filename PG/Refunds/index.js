const {
    ORDER_REFUND_REL_URL,
    REFUNDS_REL_URL,
    REFUND_STATUS_REL_URL,
} = require('../constants');

function Refunds() {
    return {
        InitiateRefund: async (data = {}) => {
            try {
                // make request
                const res = await this.doPost({
                    url: ORDER_REFUND_REL_URL,
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
        FetchAllRefunds: async (data = {}) => {
            try {
                // make request
                const res = await this.doPost({
                    url: REFUNDS_REL_URL,
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
        FetchSingleRefund: async (data = {}) => {
            try {
                // make request
                const res = await this.doPost({
                    url: REFUND_STATUS_REL_URL,
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
}

module.exports = Refunds;