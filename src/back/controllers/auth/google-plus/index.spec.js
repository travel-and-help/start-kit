'use strict';

const proxyquire = require('proxyquire');

describe('google-plus', () => {
    let router,
        authService,
        passport;
    const authMiddleware = {};

    beforeEach(() => {

        router = {
            get: env.spy(() => router)
        };

        passport = {
            authenticate: env.spy(() => authMiddleware)
        };

        authService = {
            responseAuthToken: env.spy()
        };

        const express = {
            Router: env.stub().returns(router)
        };

        proxyquire('./index', {
            express,
            passport,
            '../auth.service': authService
        });
    });

    it('should register root route', () => {
        router.get.should.been.calledWith('/', authMiddleware);
    });

    it('should register callback route', () => {
        router.get.should.been.calledWith('/callback',
            authMiddleware, authService.responseAuthToken);
    });

});
