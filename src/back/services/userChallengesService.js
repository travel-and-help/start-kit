'use strict';

const challengeService = require('./challengesService');

module.exports = {
    getByStatus
};

function getByStatus(user$, status) {
    return user$
        .findOne('challenges.status', status)
        .select('challenges')
        .then(user => challengeService.findRange(
            user.challenges
                .filter(n => n.status === status)
                .map(c => c.challenge)
        ));
}
