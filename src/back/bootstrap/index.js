'use strict';

const
    env = require('../../../env'),
    db = require('./db'),
    preMiddleware = require('./preMiddleware'),
    controllers = require('../controllers'),
    dbURL = `mongodb://${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`;

module.exports = (app) => {
    db(dbURL);
    preMiddleware(app);

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    return app.use(controllers);
};
