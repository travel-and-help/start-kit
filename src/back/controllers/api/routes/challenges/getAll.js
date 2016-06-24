'use strict';

const challenge = require('../../../../models/challenge');

const getAll = (req, res) => {
    challenge
        .find({})
        .populate('user')
        .exec()
        .then((challenges) => {
            res.json(challenges);
        });
};

module.exports = getAll;
