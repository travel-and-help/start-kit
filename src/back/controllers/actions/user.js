'use strict';

const challenge = require('../api/models/challenge');

function getWatchedChallenges(userPromise) {
    return userPromise
        .then(user => challenge.find({ _id: { $in: user.get('watchList') } }));
}

function unWatchChallenge(userPromise, challengeId) {
    return userPromise.then(user => {
        user.set(
            'watchList',
            user.get('watchList').filter(id => id.toString() !== challengeId.toString())
        );
        return user.save();
    });
}

function watchChallenge(userPromise, challengeId) {
    return userPromise.then(user => {
        user.set(
            'watchList',
            user
                .get('watchList')
                .filter(taskId => taskId.toString() !== challengeId)
                .reduce((list, id) => [...list, id], [challengeId])
        );
        return user.save();
    });
}

function acceptChallenge(userPromise, challengeId) {
    const STATUS_ACCEPTED = 'accepted';
    const newlyAccepted = {
        status: STATUS_ACCEPTED,
        date: new Date(),
        challenge: challengeId
    };
    return userPromise.then(user => {
        user.set(
            'challenges',
            user
                .get('challenges')
                .filter(task => task.status !== STATUS_ACCEPTED && challengeId !== task.challenge)
                .reduce((list, task) => [...list, task], newlyAccepted)
        );
        return user.save();
    });
}

module.exports = {
    getWatchedChallenges,
    unWatchChallenge,
    watchChallenge,
    acceptChallenge
};
