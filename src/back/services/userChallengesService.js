'use strict';

const challengeService = require('./challengesService');

module.exports = {
    getByStatus
};

function getByStatus(user$, status) {
    return user$
        .findOne('challenges.status', status)
        .select('challenges')
        .then(user => challengeService.findRange(user.challenges.map(c => c.challenge)));
}
