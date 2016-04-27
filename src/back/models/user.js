'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    photo: {
        type: String
    },
    email: String,
    facebook: {
        id: {
            type: String,
            index: true
        },
        token: String
    },
    googlePlus: {
        id: {
            type: String,
            index: true
        },
        token: String
    }
}, { collection: 'users' });

module.exports = mongoose.model('User', UserSchema);
