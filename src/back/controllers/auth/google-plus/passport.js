'use strict';


const passport = require('passport'),
    GooglePlusStrategy = require('passport-google-oauth').OAuth2Strategy,
    env = require('../../../../../env');

exports = module.exports = (User) => {

    const strategyConfig = {
            clientID: env.GOOGLE_PLUS_ID,
            clientSecret: env.GOOGLE_PLUS_SECRET,
            callbackURL: `${env.DOMAIN}/auth/google-plus/callback`,
            profileFields: ['id', 'displayName', 'photos', 'email']
        },
        verifyCallback = User.generateOAuth2VerifyCallback('googlePlus');

    passport.use(new GooglePlusStrategy(strategyConfig, verifyCallback));
};
