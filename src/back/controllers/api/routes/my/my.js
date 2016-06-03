'use strict';

const userActions = require('../../../actions/user');
const responseBuilder = require('../../../../common/response-builder');

function responseFactory(action) {
    return function responder(req, res) {
        action(req.getCurrentUser(), req.params.challengeId)
            .then(actionResult => responseBuilder.ok(res, actionResult))
            .catch(err => responseBuilder.fail(res, err));
    };
}

module.exports = {
    getWatchList: responseFactory(userActions.getWatchedChallenges),
    unWatch: responseFactory(userActions.unWatchChallenge),
    watch: responseFactory(userActions.watchChallenge)
};
