const { doPost } = require('../../utils');
const { getPGConfig } = require('../config');
const {
    PG_REL_URL,
    PG_API_VERSION,
    CREDENTIALS_VERIFY_REL_URL,
} = require('../constants');

const verifyCredentials = async (data = {}) => {
    try {
        const pgConfig = getPGConfig();
        // make request
        const res = await doPost({
            hostname: pgConfig.baseUrl,
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