'use strict';

const router = require('express').Router;
const my = require('./my');
const restrictUnauthenticated = require('../../../auth/auth.service').restrictUnauthenticated;

module.exports = router()
    .use(restrictUnauthenticated)
    .get('/wish-list', my.getWatchList)
    .put('/wish-list/:challengeId', my.watch)
    .delete('/wish-list/:challengeId', my.unWatch);
