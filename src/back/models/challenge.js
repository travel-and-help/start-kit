'use strict';

const mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const Challenge = new Schema({
    categories: [{
        type: Schema.ObjectId,
        ref: 'Category'
    }],
    title: { type: String, required: true },
    image: { type: String },
    level: { type: String, default: 'easy' },
    location: { type: String },
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    description: { type: String, required: true }
});

Challenge.plugin(mongoosePaginate);

module.exports = mongoose.model('Challenge', Challenge, 'challenges');
