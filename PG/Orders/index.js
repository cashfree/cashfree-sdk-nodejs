const { doPost } = require('../../utils');
const { getPGConfig } = require('../config');
const {
    PG_REL_URL,
    PG_API_VERSION,
    ORDER_CREATE_REL_URL,
    ORDER_GET_LINK_REL_URL,
    ORDER_GET_DETAILS_REL_URL,
    ORDER_GET_STATUS_REL_URL,
    ORDER_EMAIL_REL_URL,
} = require('../constants');

const CreateOrders = async (data = {}) => {
    try {
        const pgConfig = getPGConfig();
        // make request
        const res = await doPost({
            hostname: pgConfig.baseUrl,
            path: `${PG_REL_URL}${PG_API_VERSION}${ORDER_CREATE_REL_URL}`,
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

const GetLink = async (data = {}) => {
    try {
        const pgConfig = getPGConfig();
        // make request
        const res = await doPost({
            hostname: pgConfig.baseUrl,
            path: `${PG_REL_URL}${PG_API_VERSION}${ORDER_GET_LINK_REL_URL}`,
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

const GetDetails = async (data = {}) => {
    try {
        const pgConfig = getPGConfig();
        // make request
        const res = await doPost({
            hostname: pgConfig.baseUrl,
            path: `${PG_REL_URL}${PG_API_VERSION}${ORDER_GET_DETAILS_REL_URL}`,
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

const GetStatus = async (data = {}) => {
    try {
        const pgConfig = getPGConfig();
        // make request
        const res = await doPost({
            hostname: pgConfig.baseUrl,
            path: `${PG_REL_URL}${PG_API_VERSION}${ORDER_GET_STATUS_REL_URL}`,
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

const TriggerPaymentEmail = async (data = {}) => {
    try {
        const pgConfig = getPGConfig();
        // make request
        const res = await doPost({
            hostname: pgConfig.baseUrl,
            path: `${PG_REL_URL}${PG_API_VERSION}${ORDER_EMAIL_REL_URL}`,
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
    CreateOrders,
    GetLink,
    GetDetails,
    GetStatus,
    TriggerPaymentEmail,
}