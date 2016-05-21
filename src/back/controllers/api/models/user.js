'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    photo: { type: String },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    registerDate: { type: Date, required: true },
    lastLogin: { type: Date, required: true }, // What the value should be right after user registered?
    rating: { type: Number, required: true },
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
