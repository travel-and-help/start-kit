'use strict';

const proxyquire = require('proxyquire');

describe('controllers', () => {
    let sut,
        authRoutes,
        router;

    const
        apiRoutes = {},
        authMiddleware = {},
        userModel = {},
        staticRoutes = {};

    beforeEach(() => {

        router = {
            use: env.spy(() => router)
        };

        authRoutes = env.spy(() => authMiddleware);

        const express = {
            Router: env.stub().returns(router)
        };

        sut = proxyquire('./index', {
            express,
            './api': apiRoutes,
            './static': staticRoutes,
            './auth': authRoutes,
            './api/models/user': userModel
        });
    });

    it('should register api routes', () => {
        router.use.should.been.calledWith('/api', apiRoutes);
    });

    it('should register auth routes', () => {
        router.use.should.been.calledWith('/auth', authMiddleware);
    });

    it('should pass User to auth middleware', () => {
        authRoutes.should.been.calledWith(userModel);
    });

    it('should register static routes', () => {
        router.use.should.been.calledWith('/', staticRoutes);
    });

    it('should export router', () => {
        sut.should.equal(router);
    });

});

