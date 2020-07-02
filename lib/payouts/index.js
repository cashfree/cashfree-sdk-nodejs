const Http = require('../http');
const Auth = require('../auth');
const { ENVS } = require('./constants');

const Beneficiary = require('./services/beneficiary');
const Cashgram = require('./services/cashgram');
const Transfers = require('./services/transfers');
const Validation = require('./services/validation');
const Common = require('./services/common');
const verifySignature = require('./services/verifySignature');

const VALID_ENVS = ['TEST', 'PRODUCTION'];

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
    if (!(clientId && clientSecret)) {
      throw new Error('Bad request!');
    }

    const upperCasedEnv = env.toUpperCase();

    if (!VALID_ENVS.includes(upperCasedEnv)) {
      throw new Error(`env must be one of ${VALID_ENVS}`);
    }

    const mpaEndpoint = ENVS[upperCasedEnv].mpaEndpoint;

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
