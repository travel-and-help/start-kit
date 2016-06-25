'use strict';

const proxyquire = require('proxyquire').noCallThru();

describe('controllers/api', () => {
    let sut,
        router;

    beforeEach(() => {
        router = env.stubChain(['use']);

        const express = {
            Router: env.stub().returns(router)
        };

        sut = proxyquire('./index', {
            express,
            './routes/challenges': {},
            './routes/challenge': {},
            './routes/categories': {},
            './routes/profile': {},
            './routes/my': 'myRoutes'
        });
    });

    it('should export router', () => {
        sut.should.equal(router);
    });

    it('handles route "/my"', () => router.use.should.calledWith('/my', 'myRoutes'));
});
