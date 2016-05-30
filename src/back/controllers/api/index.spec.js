'use strict';

const proxyquire = require('proxyquire').noCallThru();

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
            express,
            './routes/challenges': {},
            './routes/challenge': {},
            './routes/categories': {},
            './routes/profile': {},
            './routes/my': {}
        });
    });

    it('should export router', () => {
        sut.should.equal(router);
    });
});

