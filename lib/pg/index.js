const Http = require('../http');
const Constants = require('./constants');

const Orders = require('./services/orders');
const Refunds = require('./services/refunds');
const Settlements = require('./services/settlements');
const Transactions = require('./services/transactions');
const verifyCredentials = require('./services/verifyCredentials');

const VALID_ENVS = ['TEST', 'PRODUCTION'];

class PG {
  static verifyCredentials(...args) {
    return verifyCredentials(...args);
  }

  constructor({ env = 'TEST', apiVersion, appId, secretKey }) {
    if (!(appId && secretKey)) {
      throw new Error('Bad request!');
    }

    const upperCasedEnv = env.toUpperCase();

    if (!VALID_ENVS.includes(upperCasedEnv)) {
      throw new Error(`env must be one of ${VALID_ENVS}`);
    }

    const baseUrl = Constants[`${upperCasedEnv}_BASE_URL`];

    this.env = upperCasedEnv;
    this.apiVersion = apiVersion;
    this.baseUrl = baseUrl;
    this.appId = appId;
    this.secretKey = secretKey;

    const api = new Http({
      hostname: baseUrl,
      data: { appId, secretKey },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    this.addResources(api);
  }

  addResources(api) {
    Object.assign(this, {
      orders: new Orders(api),
      refunds: new Refunds(api),
      settlements: new Settlements(api),
      transactions: new Transactions(api),
    });
  }
}

module.exports = PG;
