'use strict';

const router = require('express').Router,
    passport = require('passport'),
    authService = require('../auth.service');

module.exports = router()
    .get('/callback', passport.authenticate('google',
        { session: false }), authService.responseAuthToken)
    .get('/', passport.authenticate('google',
        {
            scope: [
                'https://www.googleapis.com/auth/plus.login',
                'https://www.googleapis.com/auth/plus.profile.emails.read'
            ]
        }
    ));
