'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChallengeTopic = new Schema({
    name: { type: String, required: true }
});

module.exports = mongoose.model('ChallengeTopic', ChallengeTopic, 'challengeTopics');
