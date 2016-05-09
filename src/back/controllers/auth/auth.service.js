'use strict';
const jwt = require('jsonwebtoken'),
    expressJwt = require('express-jwt'),
    env = require('../../../../env');

const validateJwt = expressJwt({
    secret: env.SESSION_SECRET,
    credentialsRequired: false,
    requestProperty: 'auth'
});

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


module.exports = {
    validateJwt,
    responseAuthToken
};
