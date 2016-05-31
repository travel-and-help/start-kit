'use strict';

const userActions = require('../../../actions/user');
const responseBuilder = require('../../../../common/response-builder');

const getWatchList = (req, res) => {
    userActions
        .getWatchedChallenges(req.getCurrentUser())
        .then(challenges => responseBuilder.ok(res, challenges))
        .catch(err => responseBuilder.fail(res, err));
};

const unWatch = (req, res) => {
    userActions
        .unWatchChallenge(req.getCurrentUser(), req.params.challengeId)
        .then(savingResult => responseBuilder.ok(res, savingResult))
        .catch(err => responseBuilder.fail(res, err));
};

module.exports = {
    getWatchList,
    unWatch
};
