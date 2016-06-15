'use strict';

const mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const Challenge = new Schema({
    categories: [{
        type: Schema.ObjectId,
        ref: 'Category'
    }],
    title: { type: String},
    image: { type: String },
    location: { type: String },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    description: { type: String }
});

Challenge.plugin(mongoosePaginate);

module.exports = mongoose.model('Challenge', Challenge, 'challenges');
