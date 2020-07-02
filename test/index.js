const chai = require('chai');
const { Payouts, PaymentGateway } = require('../index');

const { assert } = chai;

const env = process.env.NODE_ENV;
const ENVS = {
  TEST: {
    apiVersion: process.env.API_VERSION,
    appId: process.env.API_ID,
    secretKey: process.env.SECRET_KEY,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  },
};

const SUCCESS_STATUS = 'SUCCESS' || 'OK';
const ERROR_STATUS = 'ERROR';
const PATH_TO_PUBLIC_KEY = './file.pem';

const { apiVersion, appId, secretKey, clientId, clientSecret } = ENVS[env];

let payoutsInstance;

try {
  // Creating payouts instance without public key
  payoutsInstance = new Payouts({
    env,
    clientId,
    clientSecret,
  });
} catch (error) {
  console.log("Can't create Payouts instance!");
}

try {
  // Creating payouts instance with public key
  payoutsInstance = new Payouts({
    env,
    clientId,
    clientSecret,
    pathToPublicKey: PATH_TO_PUBLIC_KEY,
  });
} catch (error) {
  console.log("Can't create Payouts instance using publicKey!");
}

describe('#verifySignature()', function () {
  it('Signature is valid', async function () {
    const body = {};
    const isValid = Payouts.verifySignature(body);

    assert.equal(isValid, true);
  });
});

describe('Beneficiary', function () {
  describe('#add()', function () {
    it('status is SUCCESS/OK and subCode is 200', async function () {
      const body = {
        beneId: 'GREEN0001',
        name: 'john doe',
        email: 'johndoe@cashfree.com',
        phone: '9876543210',
        bankAccount: '11111111222234',
        ifsc: 'HDFC0000001',
        address1: 'ABC Street',
        city: 'Bangalore',
        state: 'Karnataka',
        pincode: '560001',
      };

      const response = await payoutsInstance.beneficiary.add(body);

      console.log(response);

      assert.equal(response.status, SUCCESS_STATUS);
      assert.equal(response.subCode, '200');
    });
  });

  describe('#getById()', function () {
    it('status is SUCCESS/OK and subCode is 200', async function () {
      const body = {
        beneId: 'GREEN0001',
      };

      const response = await payoutsInstance.beneficiary.getById(body);

      console.log(response);

      assert.equal(response.status, SUCCESS_STATUS);
      assert.equal(response.subCode, '200');
    });
  });

  describe('#getIdByBankDetails()', function () {
    it('status is SUCCESS/OK and subCode is 200', async function () {
      const body = {
        bankAccount: '11111111222234',
        ifsc: 'HDFC0000001',
      };

      const response = await payoutsInstance.beneficiary.getIdByBankDetails(
        body,
      );

      console.log(response);

      assert.equal(response.status, SUCCESS_STATUS);
      assert.equal(response.subCode, '200');
    });
  });

  describe('#remove()', function () {
    it('status is SUCCESS/OK and subCode is 200', async function () {
      const body = {
        beneId: 'GREEN0001',
      };

      const response = await payoutsInstance.beneficiary.remove(body);

      console.log(response);

      assert.equal(response.status, SUCCESS_STATUS);
      assert.equal(response.subCode, '200');
    });
  });
});

describe('Transfers', function () {
  describe('#requestTransfer()', function () {
    it('status is SUCCESS/OK and subCode is 200', async function () {
      const body = {
        beneId: 'JOHN18012',
        amount: '100.00',
        transferId: 'DEC2017',
      };

      const response = await payoutsInstance.transfers.requestTransfer(body);

      console.log(response);

      assert.equal(response.status, SUCCESS_STATUS);
      assert.equal(response.subCode, '200');
    });
  });

  describe('#getTransferStatus()', function () {
    it('status is SUCCESS/OK and subCode is 200', async function () {
      const body = {
        referenceId: '14057',
        transferId: 'JUNOB2018',
      };

      const response = await payoutsInstance.transfers.getTransferStatus(body);

      console.log(response);

      assert.equal(response.status, SUCCESS_STATUS);
      assert.equal(response.subCode, '200');
    });
  });

  describe('#getTransfers()', function () {
    it('status is SUCCESS/OK and subCode is 200', async function () {
      const body = {
        maxReturn: 10,
      };

      const response = await payoutsInstance.transfers.getTransfers(body);

      console.log(response);

      assert.equal(response.status, SUCCESS_STATUS);
      assert.equal(response.subCode, '200');
    });
  });

  describe('#requestBatchTransfer()', function () {
    it('status is SUCCESS/OK and subCode is 200', async function () {
      const body = {
        batchTransferId: 'Test_Bank_Account_Format_45',
        batchFormat: 'BANK_ACCOUNT',
        deleteBene: 1,
        batch: [
          {
            transferId: 'PTM_00121241112',
            amount: '12',
            phone: '9999999999',
            bankAccount: '9999999999',
            ifsc: 'PYTM0_000001',
            email: 'bahrat@gocashfree.com',
            name: 'bharat',
          },
          {
            transferId: 'PTM_00052312126',
            amount: '12',
            phone: '9999999999',
            bankAccount: '9999999999',
            ifsc: 'PYTM0000001',
            email: 'bharat@gocashfree.com',
            name: 'bharat',
          },
          {
            transferId: 'PTM_0001321215',
            amount: '12',
            phone: '9999999999',
            bankAccount: '9999999999',
            ifsc: 'PYTM0000001',
            email: 'bahrat@gocashfree.com',
            name: 'bharat',
          },
        ],
      };

      const response = await payoutsInstance.transfers.requestBatchTransfer(
        body,
      );

      console.log(response);

      assert.equal(response.status, SUCCESS_STATUS);
      assert.equal(response.subCode, '200');
    });
  });

  describe('#getBatchTransferStatus()', function () {
    it('status is SUCCESS/OK and subCode is 200', async function () {
      const body = {
        batchTransferId: 'Test_Bank_Account_Format_45',
      };

      const response = await payoutsInstance.transfers.getBatchTransferStatus(
        body,
      );

      console.log(response);

      assert.equal(response.status, SUCCESS_STATUS);
      assert.equal(response.subCode, '200');
    });
  });
});

describe('Validation', function () {
  describe('#validateBankDetails()', function () {
    it('status is SUCCESS/OK and subCode is 200', async function () {
      const body = {
        name: 'JOHN',
        phone: '9908712345',
        bankAccount: '026291800001191',
        ifsc: 'YESB0000262',
      };

      const response = await payoutsInstance.validation.validateBankDetails(
        body,
      );

      console.log(response);

      assert.equal(response.status, SUCCESS_STATUS);
      assert.equal(response.subCode, '200');
    });
  });

  describe('#validateUPIDetails()', function () {
    it('status is SUCCESS/OK and subCode is 200', async function () {
      const body = {
        name: 'Cashfree',
        vpa: 'success@upi',
      };

      const response = await payoutsInstance.validation.validateUPIDetails(
        body,
      );

      console.log(response);

      assert.equal(response.status, SUCCESS_STATUS);
      assert.equal(response.subCode, '200');
    });
  });

  describe('#validateBulkBankActivation()', function () {
    it('status is SUCCESS/OK and subCode is 200', async function () {
      const body = {
        bulkValidationId: 'testid1',
        entries: [
          {
            name: 'Sameera Cashfree',
            bankAccount: '000890289871772',
            ifsc: 'SCBL0036078',
            phone: '9015991882',
          },
          {
            name: 'Cashfree Sameera',
            bankAccount: '0001001289877623',
            ifsc: 'SBIN0008752',
            phone: '9023991882',
          },
        ],
      };

      const response = await payoutsInstance.validation.validateBulkBankActivation(
        body,
      );

      console.log(response);

      assert.equal(response.status, SUCCESS_STATUS);
      assert.equal(response.subCode, '200');
    });
  });

  describe('#getBulkValidationStatus()', function () {
    it('status is SUCCESS/OK and subCode is 200', async function () {
      const body = {
        bulkValidationId: 'testid1',
      };

      const response = await payoutsInstance.validation.getBulkValidationStatus(
        body,
      );

      console.log(response);

      assert.equal(response.status, SUCCESS_STATUS);
      assert.equal(response.subCode, '200');
    });
  });
});

describe('Cashgram', function () {
  describe('#create()', function () {
    it('status is SUCCESS/OK and subCode is 200', async function () {
      const body = {
        cashgramId: 'JOHaN10',
        amount: '1',
        name: 'john doe',
        email: 'johndoe@cashfree.com',
        phone: '9876543210',
        linkExpiry: '2018/09/12',
        remarks: 'api',
        notifyCustomer: 1,
      };

      const response = await payoutsInstance.cashgram.create(body);

      console.log(response);

      assert.equal(response.status, SUCCESS_STATUS);
      assert.equal(response.subCode, '200');
    });
  });

  describe('#getStatus()', function () {
    it('status is SUCCESS/OK and subCode is 200', async function () {
      const body = {
        cashgramId: 'JOHaN10',
      };

      const response = await payoutsInstance.cashgram.getStatus(body);

      console.log(response);

      assert.equal(response.status, SUCCESS_STATUS);
      assert.equal(response.subCode, '200');
    });
  });

  describe('#deactivate()', function () {
    it('status is SUCCESS/OK and subCode is 200', async function () {
      const body = {
        cashgramId: 'JOHaN10',
      };

      const response = await payoutsInstance.cashgram.deactivate(body);

      console.log(response);

      assert.equal(response.status, SUCCESS_STATUS);
      assert.equal(response.subCode, '200');
    });
  });
});

describe('Common', function () {
  describe('#selfWithdrawal()', function () {
    it('status is SUCCESS/OK and subCode is 200', async function () {
      const body = {
        withdrawalId: 'withdraw1',
        amount: 100,
        remarks: 'withdrawal request',
      };

      const response = await payoutsInstance.selfWithdrawal(body);

      console.log(response);

      assert.equal(response.status, SUCCESS_STATUS);
      assert.equal(response.subCode, '200');
    });
  });

  describe('#getBalance()', function () {
    it('status is SUCCESS/OK and subCode is 200', async function () {
      const response = await payoutsInstance.getBalance();

      console.log(response);

      assert.equal(response.status, SUCCESS_STATUS);
      assert.equal(response.subCode, '200');
    });
  });
});

let pgInstance;

try {
  // Creating payment gateway instance
  pgInstance = new PaymentGateway({
    env,
    apiVersion,
    appId,
    secretKey,
  });
} catch (error) {
  console.log("Can't create Payment Gateway instance!");
}

describe('#verifyCredentials()', function () {
  it('Credentials are valid', async function () {
    const body = {
      env,
      appId,
      secretKey,
    };

    const response = await PaymentGateway.verifyCredentials(body);

    console.log(response);

    assert.equal(response.status, SUCCESS_STATUS);
  });
});

describe('Orders', function () {
  describe('#createOrders()', function () {
    it('status is SUCCESS/OK and subCode is 200', async function () {
      const body = {
        orderId: 'ORDER123',
        orderAmount: '154',
        customerName: 'Test Name',
        customerPhone: '9111122222',
        customerEmail: 'johndoe@cashfree.com',
        returnUrl: 'https://example.com/return',
      };

      const response = await pgInstance.orders.createOrders(body);

      console.log(response);

      assert.equal(response.status, SUCCESS_STATUS);
      assert.equal(response.subCode, '200');
    });
  });

  describe('#getLink()', function () {
    it('status is SUCCESS/OK and subCode is 200', async function () {
      const body = {
        orderId: 'ORDER123',
      };

      const response = await pgInstance.orders.getLink(body);

      console.log(response);

      assert.equal(response.status, SUCCESS_STATUS);
      assert.equal(response.subCode, '200');
    });
  });

  describe('#getDetails()', function () {
    it('status is SUCCESS/OK and subCode is 200', async function () {
      const body = {
        orderId: 'ORDER123',
      };

      const response = await pgInstance.orders.getDetails(body);

      console.log(response);

      assert.equal(response.status, SUCCESS_STATUS);
      assert.equal(response.subCode, '200');
    });
  });

  describe('#getStatus()', function () {
    it('status is SUCCESS/OK and subCode is 200', async function () {
      const body = {
        orderId: 'ORDER123',
      };

      const response = await pgInstance.orders.getStatus(body);

      console.log(response);

      assert.equal(response.status, SUCCESS_STATUS);
      assert.equal(response.subCode, '200');
    });
  });

  describe('#triggerPaymentEmail()', function () {
    it('status is SUCCESS/OK and subCode is 200', async function () {
      const body = {
        orderId: 'ORDER123',
      };

      const response = await pgInstance.orders.triggerPaymentEmail(body);

      console.log(response);

      assert.equal(response.status, SUCCESS_STATUS);
      assert.equal(response.subCode, '200');
    });
  });
});

describe('Transactions', function () {
  describe('#fetchTransactions()', function () {
    it('status is SUCCESS/OK and subCode is 200', async function () {
      const body = {
        startDate: '2019-01-01',
        endDate: '2018-01-11',
        txStatus: 'SUCCESS',
        count: 2,
      };

      const response = await pgInstance.transactions.fetchTransactions(body);

      console.log(response);

      assert.equal(response.status, SUCCESS_STATUS);
      assert.equal(response.subCode, '200');
    });
  });
});

describe('Refunds', function () {
  describe('#initiateRefund()', function () {
    it('status is SUCCESS/OK and subCode is 200', async function () {
      const body = {
        orderId: 'ORDER123',
        referenceId: '13307',
        refundAmount: '102.00',
        refundNote: 'Sample Refund note',
        refundType: '',
        refundType: '',
        mode: '',
        accountNo: '',
        ifsc: '',
      };

      const response = await pgInstance.refunds.initiateRefund(body);

      console.log(response);

      assert.equal(response.status, SUCCESS_STATUS);
      assert.equal(response.subCode, '200');
    });
  });

  describe('#fetchAllRefunds()', function () {
    it('status is SUCCESS/OK and subCode is 200', async function () {
      const body = {
        startDate: '2016-04-01',
        endDate: '2016-04-27',
        count: 2,
      };

      const response = await pgInstance.refunds.fetchAllRefunds(body);

      console.log(response);

      assert.equal(response.status, SUCCESS_STATUS);
      assert.equal(response.subCode, '200');
    });
  });

  describe('#fetchSingleRefund()', function () {
    it('status is SUCCESS/OK and subCode is 200', async function () {
      // Provide refundId or merchantRefundId to get refund status
      const body = {
        refundId: 'REFUND123',
      };

      const response = await pgInstance.refunds.fetchSingleRefund(body);

      console.log(response);

      assert.equal(response.status, SUCCESS_STATUS);
      assert.equal(response.subCode, '200');
    });
  });

  describe('#fetchSingleRefund()', function () {
    it('status is SUCCESS/OK and subCode is 200', async function () {
      // Provide refundId or merchantRefundId to get refund status
      const body = {
        refundId: 'REFUND123',
      };

      const response = await pgInstance.refunds.fetchSingleRefund(body);

      console.log(response);

      assert.equal(response.status, SUCCESS_STATUS);
      assert.equal(response.subCode, '200');
    });
  });
});

describe('Settlements', function () {
  describe('#fetchAllSettlements()', function () {
    it('status is SUCCESS/OK and subCode is 200', async function () {
      const body = {
        startDate: '2016-04-01',
        endDate: '2016-04-30',
        count: 10,
      };

      const response = await pgInstance.settlements.fetchAllSettlements(body);

      console.log(response);

      assert.equal(response.status, SUCCESS_STATUS);
      assert.equal(response.subCode, '200');
    });
  });

  describe('#fetchSettlementById()', function () {
    it('status is SUCCESS/OK and subCode is 200', async function () {
      const body = {
        settlementId: 'SETTLEMENT123',
      };

      const response = await pgInstance.settlements.fetchSettlementById(body);

      console.log(response);

      assert.equal(response.status, SUCCESS_STATUS);
      assert.equal(response.subCode, '200');
    });
  });
});
