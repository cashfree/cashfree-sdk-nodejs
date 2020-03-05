const { checkKeysInObject } = require('../utils');
const { PROD_BASE_URL, TEST_BASE_URL } = require('./constants');

const pgConfig = {};

const getPGConfig = () => {
    if (Object.keys(pgConfig).length === 0) throw new Error('Environment variables are not initialized');
    return { ...pgConfig };
};

const setEnvironment = options => {
    // validate the options object
    const requiredKeys = ['env', 'apiVersion', 'appId', 'secretKey'];
    const validationError = checkKeysInObject(options, requiredKeys);
    if (!validationError || validationError.status) return validationError;
    if(!options.env || !['TEST', 'PRODUCTION'].includes(options.env.toUpperCase())) {
        return {
            status: 'ERROR',
            reason: 'env must be one of TEST / PRODUCTION',
        };
    }
    // set the keys
    pgConfig.env = options.env;
    pgConfig.apiVersion = options.apiVersion;
    pgConfig.baseUrl = options.env.trim().toUpperCase() === 'TEST' ? TEST_BASE_URL : PROD_BASE_URL;
    pgConfig.appId = options.appId;
    pgConfig.secretKey = options.secretKey;
    return { status: 'OK' };
}

module.exports = {
    getPGConfig,
    setEnvironment,
}