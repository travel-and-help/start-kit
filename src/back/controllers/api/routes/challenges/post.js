'use strict';

const Challenge = require('../../models/challenge');

const post = (req, res) => {
    const model = new Challenge(req.body);

    model.save((err, challenge) => {
        if (!err) {
            res.json(challenge);
        } else {
            res.status(400).send(err);
        }
    });
};

module.exports = post;
