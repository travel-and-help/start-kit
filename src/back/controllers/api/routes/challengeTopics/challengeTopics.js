'use strict';

const challengeTopic = require('./../../models/challengeTopic');

const getAll = (req, res) => {
    challengeTopic.find({}, (err, challengeTopics) => {
        res.json(challengeTopics);
    });
};

module.exports = {
    getAll
};
