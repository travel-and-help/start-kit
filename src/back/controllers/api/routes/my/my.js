'use strict';

const userChallengesService = require('../../../../services/userActionsService');
const responseBuilder = require('../../../../common/response-builder');

function responseFactory(action) {
    return function responder(req, res) {
        action(req.getCurrentUser(), req.params.challengeId)
            .then(actionResult => responseBuilder.ok(res, actionResult))
            .catch(err => responseBuilder.fail(res, err));
    };
}

module.exports = {
    getWatchList: responseFactory(userChallengesService.getWatchedChallenges),
    unWatch: responseFactory(userChallengesService.unWatchChallenge),
    acceptChallenge: responseFactory(userChallengesService.acceptChallenge),
    watch: responseFactory(userChallengesService.watchChallenge),
    getCreatedChallenges: responseFactory(userChallengesService.getCreatedChallenges),
    getCompletedChallenges: responseFactory(userChallengesService.getCompletedChallenges),
    getAcceptedChallenges: responseFactory(userChallengesService.getAcceptedChallenges)
};
