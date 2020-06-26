const Http = require('../http');
const Auth = require('../auth');
const { checkKeysInObject } = require('../utils');
const { ENVS } = require('./constants');

const Beneficiary = require('./services/beneficiary');
const Cashgram = require('./services/cashgram');
const Transfers = require('./services/transfers');
const Validation = require('./services/validation');
const Common = require('./services/common');
const verifySignature = require('./services/verifySignature');

const VALID_ENVS = ['TEST', 'PRODUCTION'];
const REQUIRED_KEYS = ['clientId', 'clientSecret'];

class Payouts {
  static verifySignature(...args) {
    return verifySignature(...args);
  }

  constructor({
    env = 'TEST',
    clientId,
    clientSecret,
    publicKey,
    pathToPublicKey,
  }) {
    const upperCasedEnv = env.toUpperCase();

    const isValid = checkKeysInObject(options, REQUIRED_KEYS);

    if (!isValid) {
      throw new Error('Bad request!');
    }

    if (publicKey || pathToPublicKey) {
      throw new Error('Either provide PublicKey or PublicKey path!');
    }

    const upperCasedEnv = env.toUpperCase();

    if (VALID_ENVS.includes(upperCasedEnv)) {
      throw new Error(`env must be one of ${VALID_ENVS}`);
    }

    const mpaEndpoint = ENVS[env].mpaEndpoint;

    const api = new Http({
      hostname: mpaEndpoint,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const auth = new Auth({
      mpaEndpoint,
      clientId,
      clientSecret,
      publicKey,
      pathToPublicKey,
    });

    this.addResources(api, auth);
  }

  addResources(api, auth) {
    Object.assign(this, {
      beneficiary: new Beneficiary(api, auth),
      cashgram: new Cashgram(api, auth),
      transfers: new Transfers(api, auth),
      validation: new Validation(api, auth),
      ...new Common(api, auth),
    });
  }
}

module.exports = Payouts;
