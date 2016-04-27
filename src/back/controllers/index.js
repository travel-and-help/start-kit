'use strict';

const router = require('express').Router;
const User = require('../models/user');

module.exports = router()
    .use('/api', require('./api'))
    .use('/auth', require('./auth')(User))
    .use('/', require('./static'));
