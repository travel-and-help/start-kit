'use strict';

const challenge = require('../../models/challenge');

const getOne = (req, res, next) => {
    challenge.findById(req.params.id, (err, challengeDetails) => {
        if (err) {
            next(err);
        } else {
            res.json(challengeDetails);
        }
    });
};

module.exports = getOne;
