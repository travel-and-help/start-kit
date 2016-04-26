'use strict';

const router = require('express').Router;

module.exports = router()
    .use('/challenges', require('./routes/challenges'));
    //.get('/challenge/:id', challengeController);
