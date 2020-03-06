const { doPost } = require('../../utils');
const { getPGConfig } = require('../config');
const {
    PG_REL_URL,
    PG_API_VERSION,
    ORDER_REFUND_REL_URL,
    REFUNDS_REL_URL,
    REFUND_STATUS_REL_URL,
} = require('../constants');

const InitiateRefund = async (data = {}) => {
    try {
        const pgConfig = getPGConfig();
        // make request
        const res = await doPost({
            hostname: pgConfig.baseUrl,
            path: `${PG_REL_URL}${PG_API_VERSION}${ORDER_REFUND_REL_URL}`,
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

const FetchAllRefunds = async (data = {}) => {
    try {
        const pgConfig = getPGConfig();
        // make request
        const res = await doPost({
            hostname: pgConfig.baseUrl,
            path: `${PG_REL_URL}${PG_API_VERSION}${REFUNDS_REL_URL}`,
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

const FetchSingleRefund = async (data = {}) => {
    try {
        const pgConfig = getPGConfig();
        // make request
        const res = await doPost({
            hostname: pgConfig.baseUrl,
            path: `${PG_REL_URL}${PG_API_VERSION}${REFUND_STATUS_REL_URL}`,
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
};

module.exports = {
    InitiateRefund,
    FetchAllRefunds,
    FetchSingleRefund,
};