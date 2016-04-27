'use strict';

const env = require('./env');

module.exports = {
    db: env.DB_NAME,
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    collection: 'migrations',
    directory: './migrations'
};
