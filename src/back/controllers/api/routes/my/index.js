'use strict';

const router = require('express').Router;
const my = require('./my');
const restrictUnauthenticated = require('../../../auth/auth.service').restrictUnauthenticated;

module.exports = router()
    .use(restrictUnauthenticated)
    .get('/wish-list', my.getWatchList)
    .put('/wish-list/:challengeId', my.watch)
    .delete('/wish-list/:challengeId', my.unWatch)
    .get('/accepted-challenges', my.getAcceptedChallenges)
    .put('/accepted-challenges/:challengeId', my.acceptChallenge)
    .get('/created-challenges', my.getCreatedChallenges)
    .get('/completed-challenges', my.getCompletedChallenges);
