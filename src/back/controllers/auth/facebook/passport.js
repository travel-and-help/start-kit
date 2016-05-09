'use strict';

const passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    env = require('../../../../../env');

exports = module.exports = (User) => {

    const strategyConfig = {
            clientID: env.FACEBOOK_ID,
            clientSecret: env.FACEBOOK_SECRET,
            callbackURL: `${env.DOMAIN}/auth/facebook/callback`,
            profileFields: ['id', 'displayName', 'photos', 'emails']
        },
        verifyCallback = User.generateOAuth2VerifyCallback('facebook');

    passport.use(new FacebookStrategy(strategyConfig, verifyCallback));
};
