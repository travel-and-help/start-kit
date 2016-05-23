'use strict';

const
    mongodbUri = require('mongodb-uri'),
    env = require('../../../env'),
    db = require('./db'),
    preMiddleware = require('./preMiddleware'),
    controllers = require('../controllers');

module.exports = (app) => {
    db(formatMongooseDbUriFromEnv(env));
    preMiddleware(app);
    return app.use(controllers);
};

function formatMongooseDbUriFromEnv(environment) {
    return mongodbUri.formatMongoose({
        scheme: 'mongodb',
        hosts: [
            {
                host: environment.DB_HOST,
                port: environment.DB_PORT
            }
        ],
        username: environment.DB_USER,
        password: environment.DB_PASSWORD,
        database: environment.DB_NAME
    });
}
