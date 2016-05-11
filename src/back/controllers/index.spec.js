'use strict';

const proxyquire = require('proxyquire').noCallThru();

describe('controllers', () => {
    let sut,
        router;

    const
        apiRoutes = {},
        staticRoutes = {};

    beforeEach(() => {

        router = {
            use: env.spy(() => router)
        };

        const express = {
            Router: env.stub().returns(router)
        };

        sut = proxyquire('./index', {
            express,
            './api': apiRoutes,
            './static': staticRoutes
        });
    });

    it('should register api routes', () => {
        router.use.should.been.calledWith('/api', apiRoutes);
    });

    it('should register static routes', () => {
        router.use.should.been.calledWith('/', staticRoutes);
    });

    it('should export router', () => {
        sut.should.equal(router);
    });

});

