'use strict';

const proxyquire = require('proxyquire'),
    expect = require('chai').expect;

describe('google passport', () => {
    let sut,
        envValues,
        passport,
        passportGoogle,
        user;
    const googleStrategy = {};
    beforeEach(() => {

        envValues = {
            SESSION_SECRET: 'testSecret',
            GOOGLE_PLUS_ID: 'testGoogleId',
            GOOGLE_PLUS_SECRET: 'testGoogleSecret',
            DOMAIN: 'testDomain'
        };
        passportGoogle = {
            OAuth2Strategy: env.spy(() => googleStrategy)
        };
        passport = {
            use: env.spy()
        };
        user = {
            generateOAuth2VerifyCallback: env.spy(() => 'VerifyCallback')
        };

        sut = proxyquire('./passport', {
            '../../../../../env': envValues,
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
            user.generateOAuth2VerifyCallback.should.been.calledWith('googlePlus');
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

