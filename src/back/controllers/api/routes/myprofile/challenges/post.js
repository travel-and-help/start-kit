'use strict';

const user = require('../../../models/user');

const postChallenge = (req, res) => {
    user.findOneAndUpdate(
        {},
        { $push: { challenges: req.body.challenge } },
        {new: true},
        (err, user) => {
            res.send(user);
        }
    );
};

module.exports = postChallenge;
