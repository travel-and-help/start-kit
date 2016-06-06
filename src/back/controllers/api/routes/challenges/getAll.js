'use strict';

const challenge = require('../../models/challenge');

const getAll = (req, res) => {
    challenge
        .find({})
        .populate('user')
        .exec((err, challenges) => {
            res.json(challenges);
        });
};

module.exports = getAll;
