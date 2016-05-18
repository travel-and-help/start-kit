'use strict';

const proxyquire = require('proxyquire'),
    expect = require('chai').expect;

describe('facebook passport', () => {
    let sut,
        envValues,
        passport,
        passportFacebook,
        authService,
        user;
    const facebookStrategy = {};
    beforeEach(() => {

        envValues = {
            SESSION_SECRET: 'testSecret',
            FACEBOOK_ID: 'testFacebookId',
            FACEBOOK_SECRET: 'testFacebookSecret',
            API_BASE_URL: 'testDomain'
        };
        passportFacebook = {
            Strategy: env.spy(() => facebookStrategy)
        };
        authService = {
            generateOAuth2VerifyCallback: env.spy(() => 'VerifyCallback')
        };
        passport = {
            use: env.spy()
        };
        user = {};

        sut = proxyquire('./passport', {
            '../../../../../env': envValues,
            '../auth.service': authService,
            'passport-facebook': passportFacebook,
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

        it('should register facebook strategy', () => {
            authService.generateOAuth2VerifyCallback.should.been.calledWith(user, 'facebook');
            passportFacebook.Strategy.should.been.calledWith({
                clientID: 'testFacebookId',
                clientSecret: 'testFacebookSecret',
                callbackURL: 'testDomain/auth/facebook/callback',
                profileFields: ['id', 'displayName', 'photos', 'emails']
            }, 'VerifyCallback');
            passport.use.should.been.calledWith(facebookStrategy);
        });

    });
});

