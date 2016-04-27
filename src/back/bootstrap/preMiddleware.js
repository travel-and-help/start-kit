'use strict';

const bodyParser = require('body-parser'),
    passport = require('passport'),
    authService = require('../controllers/auth/auth.service');

module.exports = (app) => app
    .use(bodyParser.json())
    .use(authService.validateJwt)
    .use(passport.initialize())
;
