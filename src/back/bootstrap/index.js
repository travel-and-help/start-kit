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
    return app.use(controllers);
};
