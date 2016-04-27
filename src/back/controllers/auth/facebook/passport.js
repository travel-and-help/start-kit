'use strict';

const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

exports = module.exports = (User) => {

    const domain = process.env.DOMAIN || '';
    passport.use(new FacebookStrategy(
        {
            // todo: env.
            clientID: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_SECRET,
            callbackURL: `${domain}/auth/facebook/callback`,
            profileFields: ['id', 'displayName', 'photos', 'emails']
        },
        (accessToken, refreshToken, profile, done) => {
            User.findOne({ 'facebook.id': profile.id })
                .then((user) => {
                    if (user) {
                        return user;
                    }
                    const newUser = new User();
                    newUser.facebook.id = profile.id;
                    newUser.facebook.token = accessToken;
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
