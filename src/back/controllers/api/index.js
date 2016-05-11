'use strict';
const router = require('express').Router;

module.exports = router()
    .use('/challenges', require('./routes/challenges'))
    .use('/categories', require('./routes/categories'));
