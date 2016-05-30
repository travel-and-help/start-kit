'use strict';
const router = require('express').Router;

module.exports = router()
    .use('/challenges', require('./routes/challenges'))
    .use('/challenge', require('./routes/challenge'))
    .use('/categories', require('./routes/categories'))
    .use('/my', require('./routes/my'));
