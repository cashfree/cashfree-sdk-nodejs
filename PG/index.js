const { checkKeysInObject } = require('../utils');
const {
    PROD_BASE_URL,
    TEST_BASE_URL,
    PG_REL_URL,
    PG_API_VERSION,
} = require('./constants');

const Orders = require('./Orders');
const Refunds = require('./Refunds');
const Settlements = require('./Settlements');
const Transactions = require('./Transactions');
const { verifyCredentials } = require('./Credentials');

const { doPost } = require('../utils');

class PG {
    constructor(options = {}){
        // check for the required felds
        const requiredKeys = ['env', 'apiVersion', 'appId', 'secretKey'];
        const validationError = checkKeysInObject(options, requiredKeys);
        if(validationError && validationError.message) throw new Error(validationError.message);
        // initializing the properties
        this.env = options.env;
        this.apiVersion = options.apiVersion;
        this.baseUrl = options.env.trim().toUpperCase() === 'TEST' ? TEST_BASE_URL : PROD_BASE_URL;
        this.appId = options.appId;
        this.secretKey = options.secretKey;
        this.doPost = function ({ url, headers, data }) {
            return doPost({
                hostname: this.baseUrl,
                path: `${PG_REL_URL}${PG_API_VERSION}${url}`,
                headers,
                data: { appId: this.appId, secretKey: this.secretKey, ...data },
            });
        };
        // adding PG (resources / methods)
        this.addResources();
    }
    addResources() {
        Object.assign(this, {
            Orders: Orders.call(this),
            Refunds: Refunds.call(this),
            Settlements: Settlements.call(this),
            Transactions: Transactions.call(this),
        });
    }
}

module.exports = PG;
module.exports.verifyCredentials = verifyCredentials;