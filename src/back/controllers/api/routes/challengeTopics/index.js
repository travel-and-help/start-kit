'use strict';

const router = require('express').Router;
const challengeTopics = require('./challengeTopics');

module.exports = router()
    .get('/', challengeTopics.getAll);
