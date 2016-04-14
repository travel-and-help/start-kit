'use strict';

const
    layout = require('../layout'),
    loadEnv = require('./load'),
    getenv = require('getenv');

loadEnv(layout.envFilePath);

module.exports = {
    PORT: getenv.int('PORT', 9000),
    NODE_ENV: getenv('NODE_ENV', 'production'),
    DB_URL: getenv('DB_URL', 'mongodb://localhost:27017'),
    DB_NAME: getenv('DB_NAME', 'TravelAndHelp'),
    DB_HOST: getenv('DB_HOST', 'localhost'),
    DB_PORT: getenv('DB_PORT', '27017')
};
