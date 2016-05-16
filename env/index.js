'use strict';

const
    layout = require('../layout'),
    loadEnv = require('./load'),
    getenv = require('getenv');

loadEnv(layout.envFilePath);

const port = getenv.int('PORT', 9000);

module.exports = {
    API_BASE_URL: getenv('API_BASE_URL', `http://localhost:${port}`),
    PORT: port,
    NODE_ENV: getenv('NODE_ENV', 'production'),
    PLATFORM: getenv('PLATFORM', 'web'),
    DB_NAME: getenv('DB_NAME', 'TravelAndHelp'),
    DB_HOST: getenv('DB_HOST', 'localhost'),
    DB_PORT: getenv('DB_PORT', '27017'),
    DB_USER: getenv('DB_USER', ''),
    DB_PASSWORD: getenv('DB_PASSWORD', ''),
    SESSION_SECRET: getenv('SESSION_SECRET', 'secret12345'),
    DOMAIN: getenv('DOMAIN', ''),
    FACEBOOK_ID: getenv('FACEBOOK_ID', ''),
    FACEBOOK_SECRET: getenv('FACEBOOK_SECRET', ''),
    GOOGLE_PLUS_ID: getenv('GOOGLE_PLUS_ID', ''),
    GOOGLE_PLUS_SECRET: getenv('GOOGLE_PLUS_SECRET', ''),
};
