const Constants = require('../constants');
const Http = require('../../http');

const verifyCredentials = async ({ env = 'TEST', appId, secretKey }) => {
  const upperCasedEnv = env.toUpperCase();
  const hostname = Constants[`${upperCasedEnv}_BASE_URL`];

  if (!(appId && secretKey)) {
    throw new Error('Invalid parameters!');
  }

  const api = new Http({
    hostname,
    path: Constants.VERIFY_CREDENTIALS,
    data: { appId, secretKey },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  try {
    const result = await api.post({});
    return result;
  } catch (e) {
    return {
      status: 'ERROR',
      message: (e && e.message) || 'Something went wrong',
    };
  }
};

module.exports = verifyCredentials;
