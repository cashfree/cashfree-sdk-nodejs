const crypto = require('crypto');

const verifySignature = (body, signature, clientSecret) => {
  if (!(body && signature && clientSecret)) {
    throw Error(
      'Invalid Parameters: Please give request body,' +
      'signature sent in X-Cf-Signature header and ' +
      'clientSecret from dashboard as parameters',
    );
  }

  var keys = Object.keys(body);
  keys.sort();
  var signatureData = "";

  keys.forEach((key) => { if (key != "signature") { signatureData += body[key]; } });

  const expectedSignature = crypto.createHmac('sha256', clientSecret).update(signatureData).digest('base64');
  return expectedSignature === signature;
};

module.exports = verifySignature;
