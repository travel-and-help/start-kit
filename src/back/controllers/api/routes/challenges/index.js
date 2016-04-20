'use strict';

const router = require('express').Router;
const getAll = require('./getAll');


module.exports = router()
    .get('/', getAll);
