'use strict';

const challenge = require('../../models/challenge');

const getOne = (req, res) => {
    challenge.findOne({ _id: req.params.id }, (err, challengeDetails) => {
        res.json(challengeDetails);
    });
};

module.exports = getOne;
