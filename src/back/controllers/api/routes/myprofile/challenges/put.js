'use strict';

const user = require('../../../models/user');

const putChallenge = (req, res) => {
    user.findOneAndUpdate(
        {"challenges.challenge": req.body.challenge.challenge},
        // { $push: { challenges: req.body.challenge } },
        // {new: true},
        (err, user) => {
            res.send(user);
        }
    );
};

module.exports = putChallenge;
