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
            './routes/challenges': env.stub(),
            './routes/challenge': env.stub(),
            './routes/categories': env.stub(),
            './routes/my': env.stub()
        });
    });

    it('should export router', () => {
        sut.should.equal(router);
    });
});

