'use strict';
const jwt = require('jsonwebtoken'),
    expressJwt = require('express-jwt'),
    env = require('../../../../env'),
    http = require('http'),
    mongoose = require('mongoose'),
    userModel = mongoose.model('User'),
    reqUserProperty = 'auth';

const validateJwt = expressJwt({
    secret: env.SESSION_SECRET,
    credentialsRequired: false,
    requestProperty: 'auth'
});
const UNAUTHENTICATED_STATUS = 401;

function responseAuthToken(req, res, next) {
    if (!req.user) {
        next(new Error('Something went wrong, please try again.'));
    } else {
        const id = req.user._id;
        const token = jwt.sign({ id }, env.SESSION_SECRET, { expiresIn: 60 * 60 * 5 });
        res.json({
            success: true,
            token
        });
    }
}

function generateOAuth2VerifyCallback(UserModel, providerProperty) {
    return (accessToken, refreshToken, profile, done) => {
        UserModel.findOne({ [`${providerProperty}.id`]: profile.id })
            .then((user) => {
                if (user) {
                    return user;
                }
                const newUser = new UserModel();
                newUser[providerProperty] = {
                    id: profile.id,
                    token: accessToken
                };
                newUser.fullName = profile.displayName;
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
}

function isAuthenticated() {
    return !!(this[reqUserProperty] && this[reqUserProperty].id);
}

function getCurrentUser() {
    if (!this.isAuthenticated()) {
        return Promise.reject('User is not authenticated');
    }
    return userModel.findById(this[reqUserProperty].id, { fullName: 1, email: 1 });
}

function restrictUnauthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res
            .status(UNAUTHENTICATED_STATUS)
            .json({
                success: false,
                message: http.STATUS_CODES[UNAUTHENTICATED_STATUS]
            });
    }
}

module.exports = {
    validateJwt,
    responseAuthToken,
    generateOAuth2VerifyCallback,
    isAuthenticated,
    getCurrentUser,
    restrictUnauthenticated
};
