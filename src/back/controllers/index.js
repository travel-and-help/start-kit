'use strict';

const router = require('express').Router;

module.exports = router()
    .use('/api', require('./api'))
    .use('/', require('./static'));
