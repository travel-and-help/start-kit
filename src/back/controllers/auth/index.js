'use strict';

const router = require('express').Router,
    facebookPassport = require('./facebook/passport'),
    googlePassport = require('./google-plus/passport'),
    facebookMiddleware = require('./facebook'),
    googleMiddleware = require('./google-plus');


module.exports = (User) => {
    facebookPassport(User);
    googlePassport(User);

    return router()
        .use('/facebook', facebookMiddleware)
        .use('/google-plus', googleMiddleware)
        .use('/logout', (req, res) => {
            res.status(501).send(new Error('Not Implemented'));
        });
};
