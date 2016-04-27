'use strict';

const router = require('express').Router,
    passport = require('passport');

module.exports = (User) => {

    require('./facebook/passport')(User);
    require('./google-plus/passport')(User);

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, done);
    });

    return router()
        .use('/facebook', require('./facebook'))
        .use('/google-plus', require('./google-plus'))

        .use('/logout', (req, res, next) => {
            // todo: remove jwt
            req.logout();
            next();
        })

        .use('/', (req, res) => {
            if (req.isAuthenticated()) {
                res.send('nice');
            } else {
                res.status(400).send('nope');
            }
        });
};
