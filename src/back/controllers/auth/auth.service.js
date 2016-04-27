'use strict';
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const compose = require('composable-middleware');
// todo: use env
const sessionSecret = process.env.SESSION_SECRET || 'secret12345';

const validateJwt = expressJwt({
    secret: sessionSecret,
    credentialsRequired: false,
    requestProperty: 'auth'
});

module.exports = {
    validateJwt: compose()
        .use(validateJwt),
    responseAuthToken
};

function responseAuthToken(req, res, next) {
    if (!req.user) {
        next(new Error('Something went wrong, please try again.'));
    } else {
        const id = req.user._id;
        const token = jwt.sign({ id }, sessionSecret, { expiresIn: 60 * 60 * 5 });
        res.json({
            success: true,
            token
        });
    }
}
