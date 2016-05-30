'use strict';

const challenge = require('./../../models/challenge');
const CODE_ERROR = 500;

const getWatchList = (req, res) => {
    req.getCurrentUser()
        .then(user => challenge.find({ _id: { $in: user.get('watchList') } }))
        .then(challenges => res.json(challenges))
        .catch(err => res.status(CODE_ERROR).send(err));
};

const unWatch = (req, res) => {
    req.getCurrentUser()
        .then(user => {
            user.set('watchList', user.get('watchList').filter(
                challengeId => challengeId.toString() !== req.params.challengeId.toString())
            );
            return user.save();
        })
        .then(saveResult => res.json(saveResult))
        .catch(err => res.status(CODE_ERROR).send(err));
};

module.exports = {
    getWatchList,
    unWatch
};
