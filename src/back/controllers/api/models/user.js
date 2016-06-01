'use strict';

const mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate'),
    Schema = mongoose.Schema;

const User = new Schema({
    photo: { type: String },
    fullName: {
        type: String,
        required: true
    },
    email: String,
    facebook: {
        id: {
            type: String,
            index: true
        },
        token: String
    },
    google: {
        id: {
            type: String,
            index: true
        },
        token: String
    },
    registerDate: { type: Date, required: true, default: Date.now },
    lastLogin: { type: Date, required: true, default: Date.now },
    rating: { type: Number, required: true, default: 0 },
    watchList: [{
        type: Schema.ObjectId,
        ref: 'Challenge'
    }],
    challenges: [{
        status: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        challenge: {
            type: Schema.ObjectId,
            ref: 'Challenge'
        }
    }],
    locations: {
        type: String
    },
    categories: [{
        type: Schema.ObjectId,
        ref: 'Category'
    }]
});

User.plugin(mongoosePaginate);

module.exports = mongoose.model('User', User);
