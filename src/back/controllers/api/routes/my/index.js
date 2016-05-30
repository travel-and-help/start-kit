'use strict';

const router = require('express').Router;
const users = require('./users');
const restrictUnauthenticated = require('../../../auth/auth.service').restrictUnauthenticated;

module.exports = router()
    .use(restrictUnauthenticated)
    .get('/wish-list', users.getChallengesByUserId)
    .delete('/wish-list/:challengeId', users.unWatch);
