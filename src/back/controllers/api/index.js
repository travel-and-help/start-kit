'use strict';

const router = require('express').Router;
const challenge = require('./models/challenge');
const challengeController = require('./controllers/challenge');

module.exports = router()
    .get('/challenges', (req, res) => {
        challenge.find({}, (err, challenges) => {
            res.send(challenges);
        });
    })
    .get('/challenge/:id', challengeController);
