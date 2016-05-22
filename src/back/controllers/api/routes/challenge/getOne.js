"use strict";

const challenge = require('../../models/challenge');

const getOne = (req, res) => {
    challenge.findOne({_id: req.params.id}, (err, challenge) => {
        res.json(challenge);
    });
};

module.exports = getOne;
