import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../../App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET api/proposals', () => {

  it('responds with JSON array', () => {
    return chai.request(app).get('/api/proposals')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.length(2);
      });
  });
})