'use strict';

const router = require('express').Router;

module.exports = router()
    .use('/challenges', require('./challenges'));
