'use strict';

const mongoose = require('mongoose'),
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
    wishList: [{
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
    }
});

module.exports = mongoose.model('User', User);
