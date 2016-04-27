"use strict";

const challenge = require('./../../models/challenge');

const getOne = (req, res) => {
    challenge.findOne({_id: req.params.id}, (err, challenge) => {
        res.send(challenge);
    });
};

module.exports = getOne;
