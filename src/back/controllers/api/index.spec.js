'use strict';

const proxyquire = require('proxyquire');

describe('controllers/api', () => {
    let sut,
        router;

    beforeEach(() => {

        router = {
            use: env.spy(() => router)
        };

        const express = {
            Router: env.stub().returns(router)
        };

        sut = proxyquire('./index', {
            express
        });
    });

    it('should export router', () => {
        sut.should.equal(router);
    });
});

