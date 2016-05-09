'use strict';

const proxyquire = require('proxyquire');

describe('auth', () => {
    let sut,
        facebookPassport,
        googlePassport,
        router;

    const
        user = {},
        facebookMiddleware = {},
        googleMiddleware = {};

    beforeEach(() => {

        router = {
            use: env.spy(() => router)
        };

        facebookPassport = env.spy();
        googlePassport = env.spy();
        const express = {
            Router: env.stub().returns(router)
        };

        sut = proxyquire('./index', {
            express,
            './facebook/passport': facebookPassport,
            './google-plus/passport': googlePassport,
            './facebook': facebookMiddleware,
            './google-plus': googleMiddleware
        });
    });

    describe('instance', () => {
        beforeEach(() => {
            sut(user);
        });

        it('should register facebook auth routes', () => {
            router.use.should.been.calledWith('/facebook', facebookMiddleware);
        });

        it('should register google auth routes', () => {
            router.use.should.been.calledWith('/google-plus', googleMiddleware);
        });

        it('should register logout middleware', () => {
            router.use.should.been.calledWith('/logout');
        });

        it('should initialize facebook passport', () => {
            facebookPassport.should.been.calledWith(user);
        });

        it('Should initialize google passport', () => {
            googlePassport.should.been.calledWith(user);
        });
    });

});

