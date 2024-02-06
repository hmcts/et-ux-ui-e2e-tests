const request = require('request');
const {expect} = require('chai');
const testConfig = require('../../config');

module.exports = {
  async createCitizenAccount() {
    let options = {
      method: 'POST',
      url: 'https://idam-api.aat.platform.hmcts.net/testing-support/accounts',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        forename: testConfig.TestEnvETClaimantFirstName,
        surname: testConfig.TestEnvETClaimantLastName,
        email: testConfig.TestEnvETClaimantEmailAddress,
        password: 'Adventure2023',
        active: true,
        roles: [
          {
            code: 'citizen',
          },
        ],
      }),
    };
    request(options, function (error, response) {
      if (error) {
        throw new Error(error);
      }
      console.log(response.body);
      expect(response.status).to.eql(201);
    });
  },
};
