'use strict';

const router = require('express').Router;
const get = require('./get');


module.exports = router()
    .get('/', get);
