'use strict';

const router = require('express').Router;
const categories = require('./categories');
const restrictUnauthenticated = require('../../../auth/auth.service').restrictUnauthenticated;

module.exports = router()

    .get('/', categories.getAll)
    .post('/', categories.save);
