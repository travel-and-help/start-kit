'use strict';

const router = require('express').Router;
const challenge = require('./models/challenge');
const userChallenges = require('./controllers/userChallenges');

module.exports = router()
    .get('/challenges', (req, res) => {
        challenge.find({}, (err, challenges) => {
            res.send(challenges);
        });
    })
    .get('/users/:id/challenges', userChallenges);
