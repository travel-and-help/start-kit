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
        user.set('watchList', user.get('watchList').push(challengeId));
        return user.save();
    });
}

module.exports = {
    getWatchedChallenges,
    unWatchChallenge,
    watchChallenge
};
