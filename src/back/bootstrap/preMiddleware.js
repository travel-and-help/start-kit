'use strict';

const bodyParser = require('body-parser'),
    passport = require('passport'),
    authService = require('../controllers/auth/auth.service'),
    cors = require('cors');

module.exports = (app) => app
    .use(cors())
    .use(bodyParser.json())
    .use(authService.validateJwt)
    .use(passport.initialize());
