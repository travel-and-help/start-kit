"use strict";

const challenge = require('./../models/challenge');

const challengeController = (req, res) => {
    challenge.findOne({id: req.params.id}, (err, challenge) => {
        res.send(challenge);
    });
};

module.exports = challengeController;
