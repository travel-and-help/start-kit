'use strict';

const proxyquire = require('proxyquire').noCallThru();
const chainable = require('../../../../test/unit/builders/chainable');

describe('controllers/api', () => {
    let sut,
        router;

    beforeEach(() => {
        router = chainable(['use']);

        const express = {
            Router: env.stub().returns(router)
        };

        sut = proxyquire('./index', {
            express,
            './routes/challenges': {},
            './routes/challenge': {},
            './routes/categories': {},
            './routes/profile': {},
            './routes/my': 'myRoutes',
            './routes/myprofile': 'myRoutes'
        });
    });

    it('should export router', () => {
        sut.should.equal(router);
    });

    it('handles route "/my"', () => router.use.should.calledWith('/my', 'myRoutes'));
});
