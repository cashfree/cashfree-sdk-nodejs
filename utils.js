 
var https = require("https")


let checkKeysInObject = function(req, keys) {
    if (req === undefined || typeof req !== 'object' || req === null) return {
        "status": "ERROR",
        "subCode": "412",
        "message": "Post data is empty or not a valid JSON"
    };
    var notPresent = [];
    for (var i = 0; i < keys.length; i++) {
        if (!req.hasOwnProperty(keys[i])) notPresent.push(keys[i]);
    }
    if (notPresent.length == 0) return true;
    else return {
        "status": "ERROR",
        "subCode": "412",
        "message": notPresent.join(", ") + " is/are missing in your request"
    }
}


const doPost = function(obj) {
    const options = {
        hostname: obj.hostname,
        port: 443,
        path: obj.path,
        method: 'POST',
        headers: obj.headers
    };

    const contentType = obj.headers['Content-Type'] || obj.headers['content-type'];
    const postData = ['application/x-www-form-urlencoded'].includes(contentType) ?
        qs.stringify(obj.data) : JSON.stringify(obj.data);

    let response = '';

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            // console.log(`statusCode: ${res.statusCode}`)
            res.on('data', (d) => {
                response += d;
            });
            res.on('end', (d) => {
                return resolve(JSON.parse(response));
            });
        });

        req.on('error', (error) => {
            return reject(error)
        });
        req.write(postData);
        req.end();
    });
}


let doGet = function(obj){
    const options = {
        hostname: obj.hostname,
        port: 443,
        path: obj.path,
        method: 'GET',
        headers: obj.headers
    }
    var response = '';
    var token = null

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            // console.log(`statusCode: ${res.statusCode}`)
            res.on('data', (d) => {
                response += d;
            })
            res.on('end', (d) => {
                resolve(JSON.parse(response));
            })
        })

        req.on('error', (error) => {
            reject(error)
        })
        req.end()
    })
}

let VerifyToken = function() {
    var path = "/payout/v1/verifyToken";
    var token = PayoutConstants.BearerToken;
    var data = {}
    var obj = {}
    obj.headers = {
        "Content-Type": 'application/json',
        "Authorization": "Bearer "+token
    };
    obj.path = path;
    obj.hostname = "payout-gamma.cashfree.com";
    obj.data = data;

    doPost(obj);
}

module.exports = {checkKeysInObject, doPost, VerifyToken, doGet};
