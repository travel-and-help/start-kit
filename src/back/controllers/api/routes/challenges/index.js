'use strict';

const router = require('express').Router;
const getAll = require('./getAll');
const post = require('./post');


module.exports = router()
    .get('/', getAll)
    .post('/', post);
