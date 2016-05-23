'use strict';

const proxyquire = require('proxyquire'),
    expect = require('chai').expect;

describe('google passport', () => {
    let sut,
        envValues,
        passport,
        passportGoogle,
        user,
        authService;
    const googleStrategy = {};
    beforeEach(() => {

        envValues = {
            SESSION_SECRET: 'testSecret',
            GOOGLE_PLUS_ID: 'testGoogleId',
            GOOGLE_PLUS_SECRET: 'testGoogleSecret',
            API_BASE_URL: 'testDomain'
        };
        passportGoogle = {
            OAuth2Strategy: env.spy(() => googleStrategy)
        };
        passport = {
            use: env.spy()
        };
        authService = {
            generateOAuth2VerifyCallback: env.spy(() => 'VerifyCallback')
        };

        user = {};

        sut = proxyquire('./passport', {
            '../../../../../env': envValues,
            '../auth.service': authService,
            'passport-google-oauth': passportGoogle,
            passport
        });

    });

    it('should export function', () => {
        expect(sut).to.be.an.instanceof(Function);
    });

    describe('instance', () => {

        beforeEach(() => {
            sut(user);
        });

        it('should register google strategy', () => {
            authService.generateOAuth2VerifyCallback.should.been.calledWith(user, 'googlePlus');
            passportGoogle.OAuth2Strategy.should.been.calledWith({
                clientID: 'testGoogleId',
                clientSecret: 'testGoogleSecret',
                callbackURL: 'testDomain/auth/google-plus/callback',
                profileFields: ['id', 'displayName', 'photos', 'email']
            }, 'VerifyCallback');
            passport.use.should.been.calledWith(googleStrategy);
        });

    });
});

