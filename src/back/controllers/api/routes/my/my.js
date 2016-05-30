'use strict';

const userActions = require('../../../actions/user');
const responseBuilder = require('../../../../common/response-builder');

const getWatchList = (req, res) => {
    // req.getCurrentUser()
    //     .then(user => challenge.find({ _id: { $in: user.get('watchList') } }))
    //     .then(challenges => res.json(challenges))
    //     .catch(err => res.status(CODE_ERROR).send(err));
    userActions
        .getWatchedChallenges(req.getCurrentUser())
        .then(challenges => responseBuilder.ok(res, challenges))
        .catch(err => responseBuilder.fail(res, err));
};

const unWatch = (req, res) => {
    userActions
        .unWatchChallenge(req.getCurrentUser())
        .then(savingResult => responseBuilder.ok(res, savingResult))
        .catch(err => responseBuilder.fail(res, err));
    // req.getCurrentUser()
    //     .then(user => {
    //         user.set('watchList', user.get('watchList').filter(
    //             challengeId => challengeId.toString() !== req.params.challengeId.toString())
    //         );
    //         return user.save();
    //     })
    //     .then(saveResult => res.json(saveResult))
    //     .catch(err => res.status(INTERNAL_SERVER_ERROR).send(err));
};

module.exports = {
    getWatchList,
    unWatch
};
