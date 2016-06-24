'use strict';

const challengesService = require('./challengesService');
const userChallengesService = require('./userChallengesService');
const CHALLENGE_STATUS = require('./CHALLENGE_STATUS');

module.exports = {
    getWatchedChallenges,
    getCreatedChallenges,
    getCompletedChallenges,
    getAcceptedChallenges,
    unWatchChallenge,
    watchChallenge,
    acceptChallenge
};

function getWatchedChallenges(user$) {
    return user$.then(user => challengesService.findRange(user.watchList));
}

function unWatchChallenge(user$, challengeId) {
    return user$.then((user) => _unWatchChallenge(user, challengeId));
}

function _unWatchChallenge(user, challengeId) {
    user.set(
        'watchList',
        user.get('watchList').filter(id => id.toString() !== challengeId.toString())
    );
}

function watchChallenge(user$, challengeId) {
    return user$.then(user => {
        user.set(
            'watchList',
            user
                .get('watchList')
                .filter(taskId => taskId.toString() !== challengeId)
                .reduce((list, id) => list.concat(id), [challengeId])
        );
        return user.save();
    });
}

function acceptChallenge(user$, challengeId) {
    const newlyAccepted = {
        status: CHALLENGE_STATUS.ACCEPTED,
        date: new Date(),
        challenge: challengeId
    };

    return user$.then(user => {
        user.set(
            'challenges',
            user
                .get('challenges')
                .filter(acceptedDuplicates)
                .reduce((list, task) => list.concat(task), [newlyAccepted])
        );
        _unWatchChallenge(user, challengeId);
        return user.save();
    });

    function acceptedDuplicates(task) {
        const isAccepted = task.status === CHALLENGE_STATUS.ACCEPTED;
        return !isAccepted || (isAccepted && challengeId !== task.challenge.toString());
    }
}

function getCreatedChallenges(user$) {
    return user$.then(user => challengesService.find({ user: user._id }));
}

function getAcceptedChallenges(user$) {
    return userChallengesService.getByStatus(user$, CHALLENGE_STATUS.ACCEPTED);
}

function getCompletedChallenges(user$) {
    return userChallengesService.getByStatus(user$, CHALLENGE_STATUS.COMPLETED);
}
