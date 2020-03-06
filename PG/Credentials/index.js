const { doPost, checkKeysInObject } = require('../../utils');
const {
    TEST_BASE_URL,
    PROD_BASE_URL,
    PG_REL_URL,
    PG_API_VERSION,
    CREDENTIALS_VERIFY_REL_URL,
} = require('../constants');

const verifyCredentials = async (data = {}) => {
    try {
        // make request
        const requiredKeys = ['env', 'appId', 'secretKey'];
        const validationError = checkKeysInObject(data, requiredKeys);
        if (!validationError || validationError.status) return validationError;
        if(!data.env || !['TEST', 'PRODUCTION'].includes(data.env.toUpperCase())) {
            return {
                status: 'ERROR',
                reason: 'env must be one of TEST / PRODUCTION',
            };
        }
        const res = await doPost({
            hostname: data.env.trim().toUpperCase() === 'TEST' ? TEST_BASE_URL : PROD_BASE_URL,
            path: `${PG_REL_URL}${PG_API_VERSION}${CREDENTIALS_VERIFY_REL_URL}`,
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

module.exports = { 
    verifyCredentials,
};