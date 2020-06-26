const crypto = require('crypto');

const verifySignature = (body, signature, clientSecret) => {
  if (!(body && signature && clientSecret)) {
    throw Error(
      'Invalid Parameters: Please give request body,' +
        'signature sent in X-Cf-Signature header and ' +
        'clientSecret from dashboard as parameters',
    );
  }

  const expectedSignature = crypto
    .createHmac('sha256', clientSecret)
    .update(body.toString())
    .digest('hex');

  return expectedSignature === signature;
};

module.exports = verifySignature;
