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
    .update(body)   //toString() is not required
    .digest('base64');    //the encrypted data is to be encoded to base64 instead of hex

  return expectedSignature === signature;
};

module.exports = verifySignature;
