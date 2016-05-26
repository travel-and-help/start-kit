'use strict';

const router = require('express').Router;
const getOne = require('./getOne');


module.exports = router()
    .get('/:id', getOne);
