'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    registerDate: { type: Date, required: true },
    lastLogin: { type: Date, required: true },
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

User.statics.generateOAuth2VerifyCallback =
    function generateOAuth2VerifyCallback(providerProperty) {
        return (accessToken, refreshToken, profile, done) => {
            const userModel = mongoose.model('User');
            userModel.findOne({ [`${providerProperty}.id`]: profile.id })
                .then((user) => {
                    if (user) {
                        return user;
                    }
                    const newUser = new User();
                    newUser[providerProperty].id = profile.id;
                    newUser[providerProperty].token = accessToken;
                    newUser.fullname = profile.displayName;
                    if (profile.photos && profile.photos.length > 0) {
                        newUser.photo = profile.photos[0].value;
                    }
                    if (profile.emails && profile.emails.length > 0) {
                        newUser.email = profile.emails[0].value;
                    }
                    return newUser.save();
                })
                .then((user) => {
                    done(null, user);
                })
                .catch(done);
        };
    };

module.exports = mongoose.model('User', User);
