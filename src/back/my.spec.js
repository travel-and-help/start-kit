'use strict';

const my = require('./my');

describe('my test', () => {

    it('should not fail', () => {
        my.foo().should.equal(1);
    });

});
