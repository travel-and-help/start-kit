'use strict';

const proxyquire = require('proxyquire'),
    expect = require('chai').expect;

describe('facebook passport', () => {
    let sut,
        envValues,
        passport,
        passportFacebook,
        user;
    const facebookStrategy = {};
    beforeEach(() => {

        envValues = {
            SESSION_SECRET: 'testSecret',
            FACEBOOK_ID: 'testFacebookId',
            FACEBOOK_SECRET: 'testFacebookSecret',
            DOMAIN: 'testDomain'
        };
        passportFacebook = {
            Strategy: env.spy(() => facebookStrategy)
        };
        passport = {
            use: env.spy()
        };
        user = {
            generateOAuth2VerifyCallback: env.spy(() => 'VerifyCallback')
        };

        sut = proxyquire('./passport', {
            '../../../../../env': envValues,
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
            user.generateOAuth2VerifyCallback.should.been.calledWith('facebook');
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

