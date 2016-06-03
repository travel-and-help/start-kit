'use strict';


const passport = require('passport'),
    GooglePlusStrategy = require('passport-google-oauth').OAuth2Strategy,
    env = require('../../../../../env'),
    authService = require('../auth.service');

exports = module.exports = (User) => {

    const strategyConfig = {
            clientID: env.GOOGLE_PLUS_ID,
            clientSecret: env.GOOGLE_PLUS_SECRET,
            callbackURL: `${env.API_BASE_URL}/auth/google-plus/callback`,
            profileFields: ['id', 'displayName', 'photos', 'email']
        },
        verifyCallback = authService.generateOAuth2VerifyCallback(User, 'google');

    passport.use(new GooglePlusStrategy(strategyConfig, verifyCallback));
};
