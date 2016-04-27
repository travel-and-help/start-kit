'use strict';

const passport = require('passport');
const GooglePlusStrategy = require('passport-google-oauth').OAuth2Strategy;

exports = module.exports = (User) => {

    const domain = process.env.DOMAIN || '';
    passport.use(new GooglePlusStrategy(
        {
            clientID: process.env.GOOGLE_PLUS_ID,
            clientSecret: process.env.GOOGLE_PLUS_SECRET,
            callbackURL: `${domain}/auth/google-plus/callback`,
            profileFields: ['id', 'displayName', 'photos', 'email']
        },
        (accessToken, refreshToken, profile, done) => {
            User.findOne({ 'googlePlus.id': profile.id })
                .then((user) => {
                    if (user) {
                        return user;
                    }
                    const newUser = new User();
                    newUser.googlePlus.id = profile.id;
                    newUser.googlePlus.token = accessToken;
                    newUser.fullname = profile.displayName;
                    if (profile.photos && profile.photos.length > 0) {
                        newUser.photo = profile.photos[0].value;
                    }
                    if (profile.emails && profile.emails.length > 0) {
                        newUser.email = profile.emails[0].value;
                    }
                    return newUser.save();
                })
                .then((user) => {
                    done(null, user);
                })
                .catch(done);
        }
    ));
};

