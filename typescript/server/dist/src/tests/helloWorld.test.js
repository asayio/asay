"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helloWorld_1 = require("../helloWorld");
const chai_1 = require("chai");
require("mocha");
describe('Hello Function', () => {
    it('Should return Hello World', () => {
        const result = helloWorld_1.default();
        chai_1.expect(result).to.equal('Hello World');
    });
});
