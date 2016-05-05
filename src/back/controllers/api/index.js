'use strict';

const router = require('express').Router;

module.exports = router()
    .use('/challenges', require('./routes/challenges'))
    .use('/profile', require('./routes/profile'));
