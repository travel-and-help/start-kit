'use strict';

const proxyQuire = require('proxyquire');

describe('bootstrap/db', () => {

    const q = {
        Promise: {}
    };

    let sut,
        mongoose,
        connect;

    beforeEach(() => {

        mongoose = {};
        connect = env.stub();
        sut = proxyQuire('./index', {
            mongoose,
            q,
            './connect': connect
        });
    });

    it('should use q promises with mongoose', () => {
        mongoose.Promise.should.equal(q.Promise);
    });

    it('should export connect function', () => {
        sut.should.equal(connect);
    });

});
