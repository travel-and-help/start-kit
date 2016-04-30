'use strict';

const router = require('express').Router;
const categories = require('./categories');

module.exports = router()
    .get('/', categories.getAll);
