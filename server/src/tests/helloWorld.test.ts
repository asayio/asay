import hello from '../helloWorld';
import {expect} from 'chai';

import 'mocha';

describe('Hello Function', () => {
    it('Should return Hello World', () => {
        const result = hello();
        expect(result).to.equal('Hello World');
    });
});

