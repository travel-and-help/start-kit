"use strict";

const user = require('./../models/user');
const challenge = require('./../models/challenge');

const userChallenges = (req, res) => {
    user.findOne({_id: req.params.id}, (err, user) => {
        challenge.find({_id: user.watchList},
            (err, challenges) => res.send(challenges)
        );
    });
};

module.exports = userChallenges;
