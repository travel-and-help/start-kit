'use strict';

const Challenge = require('../../models/challenge');

const put = (req, res, next) => {

    Challenge.update(
        { _id: req.params.id },
        req.body,
        (err, challenge) => {
            if (err) {
                next(err);
            } else {
                res.json(challenge);
            }
        }
    );
};

module.exports = put;
