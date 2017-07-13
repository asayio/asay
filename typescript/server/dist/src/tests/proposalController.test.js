"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const chaiHttp = require("chai-http");
const App_1 = require("../../App");
chai.use(chaiHttp);
const expect = chai.expect;
describe('GET api/proposals', () => {
    it('responds with JSON array', () => {
        return chai.request(App_1.default).get('/api/proposals')
            .then(res => {
            expect(res.status).to.equal(200);
            expect(res).to.be.json;
            expect(res.body).to.be.an('array');
            expect(res.body).to.have.length(2);
        });
    });
});
