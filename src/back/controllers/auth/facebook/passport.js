'use strict';

const passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    env = require('../../../../../env'),
    authService = require('../auth.service');

exports = module.exports = (User) => {

    const strategyConfig = {
            clientID: env.FACEBOOK_ID,
            clientSecret: env.FACEBOOK_SECRET,
            callbackURL: `${env.DOMAIN}/auth/facebook/callback`,
            profileFields: ['id', 'displayName', 'photos', 'emails']
        },
        verifyCallback = authService.generateOAuth2VerifyCallback(User, 'facebook');

    passport.use(new FacebookStrategy(strategyConfig, verifyCallback));
};
