'use strict';

const
    layout = require('../layout'),
    loadEnv = require('./load'),
    getenv = require('getenv');

loadEnv(layout.envFilePath);

module.exports = {
    PORT: getenv.int('PORT', 9000),
    NODE_ENV: getenv('NODE_ENV', 'production')
};
