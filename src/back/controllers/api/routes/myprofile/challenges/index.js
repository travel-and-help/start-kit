'use strict';

const router = require('express').Router;

module.exports = router()
    .post('/', require('./post'))
    .put('/', require('./put'));

