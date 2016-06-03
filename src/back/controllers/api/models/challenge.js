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
    location: { type: String, required: true },
    user: {
        type: Schema.ObjectId,
        ref: 'Challenge'
    },
    description: { type: String, required: true }
});

Challenge.plugin(mongoosePaginate);

module.exports = mongoose.model('Challenge', Challenge, 'challenges');
