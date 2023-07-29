const crypto = require('crypto');

const verifySignature = (body, signature, clientSecret) => {
  if (!(body && signature && clientSecret)) {
    throw Error(
      'Invalid Parameters: Please give request body (which is postData in Cashfree Documentation) ,' +
        'signature sent as X-Cf-Signature in header or as signature key in body and ' +
        'clientSecret from cashfree dashboard as parameters',
    );
  }

  if(typeof body == 'string'){
    // if user sends body as string of concatenated values of keys except 'signature'

    const expectedSignature = crypto.createHmac('sha256', process.env.CASHFREE_CLIENT_SECRET).update(body).digest('base64');
    return expectedSignature === signature;
  
  }else if(typeof body == 'object'){
    // else if user sends body as entire json request-body, 
    // then we need to create a string of concatenated "values" of body sorted in "ascending" order of keys
    // as explained in "Documentation" and pass it for encryption

    // if signature is present in the body delete signature first before creating the string
    if(body.signature){
      delete body.signature
    }

    // get an array of [ key, value ] pairs of body object
    let arr = Object.entries(body);

    // sort them in ascending order of "keys", here in [key, value] pairs
    arr.sort((a, b)=>{
        if(a[0] < b[0]){
            return -1;
        }else{
            return 1;
        }
    })

    // concatenate values of body which is now sorted in ascending order of "keys", 
    let concatenatedValues = "";
    for(let i=0;i<arr.length;i++){
      concatenatedValues+=arr[i][1];
    }

    const expectedSignature = crypto.createHmac('sha256', process.env.CASHFREE_CLIENT_SECRET).update(concatenatedValues).digest('base64');
    return expectedSignature === signature;

  }else{
    // else can't compute the body, we don't know what type of body has been sent as parameters
    
    throw Error(
      'Invalid Parameters: Please give request body (which is postData in Cashfree Documentation),' +
        'signature sent as X-Cf-Signature in header or as signature key in body and ' +
        'clientSecret from cashfree dashboard as parameters',
    );
  }
};

module.exports = verifySignature;
