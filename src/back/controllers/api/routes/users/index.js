'use strict';

const router = require('express').Router;
const users = require('./users');

module.exports = router()
    .get('/:id/challenges', users.getChallengesByUserId);
