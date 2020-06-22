const {
    SETTLEMENTS_REL_URL,
    SETTLEMENT_REL_URL,
} = require('../constants');


function Settlements() {
    return {
        FetchAllSettlements: async (data = {}) => {
            try {
                // make request
                const res = await this.doPost({
                    url: SETTLEMENTS_REL_URL,
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
        FetchSingleSettlement: async (data = {}) => {
            try {
                // make request
                const res = await this.doPost({
                    url: SETTLEMENT_REL_URL,
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

module.exports = Settlements;