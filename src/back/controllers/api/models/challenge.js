'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Challenge = new Schema({
    id: { type: Number, required: true },
    category: { type: Array, required: true },
    title: { type: String, required: true },
    image: { type: String, required: true },
    level: { type: String, required: true },
    user: { type: Object, required: true },
    description: { type: String, required: true }
});

module.exports = mongoose.model('Challenge', Challenge, 'challenge');
