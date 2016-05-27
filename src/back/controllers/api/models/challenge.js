'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Challenge = new Schema({
    category: { type: String, required: true },
    title: { type: String, required: true },
    image: { type: String, required: true },
    level: { type: String, required: true },
    location: { type: String },
    user: { type: Object },
    description: { type: String, required: true }
});

module.exports = mongoose.model('Challenge', Challenge, 'challenges');
