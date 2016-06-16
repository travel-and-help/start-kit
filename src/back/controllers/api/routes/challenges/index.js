'use strict';

const router = require('express').Router;
const getAll = require('./getAll');
const post = require('./post');
const put = require('./put');


module.exports = router()
    .get('/', getAll)
    .put('/:id', put)
    .post('/', post);
