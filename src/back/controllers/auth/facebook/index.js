'use strict';

const router = require('express').Router,
    passport = require('passport'),
    authService = require('../auth.service');

module.exports = router()
    .get('/callback', passport.authenticate('facebook'), authService.responseAuthToken)
    // todo: change fail
    .get('/', passport.authenticate('facebook', { failureRedirect: '/login' }));

