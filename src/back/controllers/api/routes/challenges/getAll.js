'use strict';

const challenge = require('../../../../models/challenge');

const getAll = (req, res) => req.getCurrentUser()
        .then((user) => {
            const userCategoriesQuery = getUserCategoriesQuery(user);

            findChallenges(res, userCategoriesQuery);
        })
        .catch(() => {
            findChallenges(res, {});
        });

function findChallenges(res, query) {
    challenge
        .find(query)
        .populate('user')
        .exec()
        .then((challenges) => {
            res.json(challenges);
        });
}

function getUserCategoriesQuery(user) {
    if (user.categories.length) {
        return { categories: { $in: user.categories } };
    }
    return {};
}

module.exports = getAll;
