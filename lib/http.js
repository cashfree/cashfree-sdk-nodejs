const https = require('https');
const qs = require('querystring');

const PORT = 443;

class Http {
  constructor({ hostname, path, headers = {}, data = {} }) {
    this.hostname = hostname;
    this.path = path;
    this.data = data;
    this.headers = headers;
  }

  post({ hostname, path, headers = {}, data = {} }) {
    const options = {
      hostname: this.hostname || hostname,
      port: process.env.PORT || PORT,
      path: this.path || path,
      method: 'POST',
      headers: { ...this.headers, ...headers },
      data: { ...this.data, ...data },
    };

    let payload;

    const contentType =
      options.headers['Content-Type'] || options.headers['content-type'];

    if (contentType === 'application/x-www-form-urlencoded') {
      payload = qs.stringify(options.data);
    } else {
      payload = JSON.stringify(options.data);
    }

    return new Promise((resolve, reject) => {
      let response = '';

      const req = https.request(options, (res) => {
        res.on('data', (d) => {
          response += d;
        });

        res.on('end', () => resolve(JSON.parse(response)));
      });

      req.on('error', reject);
      req.write(payload);
      req.end();
    });
  }

  get({ hostname, path, headers }) {
    const options = {
      hostname: this.hostname || hostname,
      path: this.path || path,
      method: 'GET',
      headers,
    };

    return new Promise((resolve, reject) => {
      let response = '';

      const req = https.request(options, (res) => {
        res.on('data', (d) => {
          response += d;
        });

        res.on('end', () => resolve(JSON.parse(response)));
      });

      req.on('error', reject);
      req.end();
    });
  }
}

module.exports = Http;
