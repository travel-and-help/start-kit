'use strict';

const router = require('express').Router,
    passport = require('passport'),
    authService = require('../auth.service');

module.exports = router()
    .get('/callback', passport.authenticate('facebook',
        { session: false }), authService.responseAuthToken)
    .get('/', passport.authenticate('facebook'));

