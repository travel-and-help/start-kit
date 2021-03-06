'use strict';
const jwt = require('jsonwebtoken'),
    expressJwt = require('express-jwt'),
    env = require('../../../../env'),
    http = require('http'),
    userModel = require('../../models/user'),
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
        const firstLogin = req.user.firstLogin;
        const token = jwt.sign({ id }, env.SESSION_SECRET, { expiresIn: 60 * 60 * 5 });
        res.json({
            success: true,
            token,
            id,
            firstLogin
        });
    }
}

function generateOAuth2VerifyCallback(UserModel, providerProperty) {
    return (accessToken, refreshToken, profile, done) => {
        UserModel.findOne({ [`${providerProperty}.id`]: profile.id })
            .then((result) => {
                let user = result;
                if (user) {
                    user.firstLogin = false;
                    user.lastLogin = new Date();
                } else {
                    user = new UserModel();
                    user[providerProperty] = {
                        id: profile.id,
                        token: accessToken
                    };
                    user.fullName = profile.displayName;
                    user.firstLogin = true;
                    if (profile.photos && profile.photos.length > 0) {
                        user.photo = profile.photos[0].value;
                    }
                    if (profile.emails && profile.emails.length > 0) {
                        user.email = profile.emails[0].value;
                    }
                }
                return user.save();
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
    return userModel.findById(this[reqUserProperty].id);
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

function initRequest(req, res, next) {
    Object.assign(req, {
        getCurrentUser,
        isAuthenticated
    });
    next();
}

module.exports = {
    validateJwt,
    responseAuthToken,
    generateOAuth2VerifyCallback,
    restrictUnauthenticated,
    initRequest
};
