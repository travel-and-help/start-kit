'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Challenge = new Schema({
    categories: { type: Array },
    title: { type: String, required: true },
    image: { type: String },
    level: { type: String },
    location: { type: String },
    user: { type: Object },
    description: { type: String, required: true }
});

module.exports = mongoose.model('Challenge', Challenge, 'challenges');
