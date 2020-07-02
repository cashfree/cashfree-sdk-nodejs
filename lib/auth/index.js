const fs = require('fs');
const Http = require('../http');

const getCurrentTimeInSecs = () => Date.now() / 1000;

const PATH = '/payout/v1/authorize';

class Auth {
  constructor({
    mpaEndpoint,
    clientId,
    clientSecret,
    publicKey,
    pathToPublicKey,
  }) {
    this.mpaEndpoint = mpaEndpoint;
    this.clientId = clientId;
    this.clientSecret = clientSecret;

    if (pathToPublicKey) {
      this.pathToPublicKey = fs.readFileSync(pathToPublicKey, 'utf8');
    } else {
      this.publicKey = publicKey;
    }
  }

  generateCertificate() {
    if (!this.publicKey) {
      return null;
    }

    const curTimeStamp = getCurrentTimeInSecs();
    const plainText = `${this.clientId}.${curTimeStamp}`;
    const buffer = new Buffer(plainText);

    const encrypted = crypto.publicEncrypt(
      {
        key: this.publicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      },
      buffer,
    );

    return encrypted.toString('base64');
  }

  async authorize() {
    let certificate;

    try {
      certificate = this.generateCertificate();
    } catch (error) {
      throw {
        status: 'ERROR',
        message: "Couldn't generate certificate",
      };
    }

    const hostname = this.mpaEndpoint;

    const obj = {
      hostname,
      path: PATH,
      headers: {
        'Content-Type': 'application/json',
        'X-Client-Id': this.clientId,
        'X-Client-Secret': this.clientSecret,
      },
    };

    if (this.publicKey) {
      obj.headers['X-Cf-Signature'] = certificate;
    }

    try {
      const api = new Http(obj);
      const response = await api.post({});

      this.bearerToken = response.data.token;
      this.expiry = parseInt(response.data.expiry);
    } catch (e) {
      throw e;
    }
  }

  async checkToken() {
    const BUFFER_TIME = 300;

    if (
      !this.bearerToken ||
      !this.expiry ||
      this.expiry - BUFFER_TIME < getCurrentTimeInSecs()
    ) {
      try {
        await this.authorize();
      } catch (e) {
        throw e;
      }
    }

    return this.bearerToken;
  }
}

module.exports = Auth;
