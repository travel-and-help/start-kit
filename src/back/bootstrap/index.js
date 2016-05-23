'use strict';

const
    mongodbUri = require('mongodb-uri'),
    env = require('../../../env'),
    db = require('./db'),
    preMiddleware = require('./preMiddleware'),
    controllers = require('../controllers');

module.exports = (app) => {
    db(formatMongooseDbUriFromEnv(env));
    extendRequest();
    preMiddleware(app);
    return app.use(controllers);
};

function extendRequest() {
    const authService = require('../controllers/auth/auth.service'),
        http = require('http');
    http.IncomingMessage.prototype.getCurrentUser = authService.getCurrentUser;
    http.IncomingMessage.prototype.isAuthenticated = authService.isAuthenticated;
}

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
