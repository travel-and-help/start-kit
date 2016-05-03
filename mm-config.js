'use strict';

const env = require('./env');

module.exports = {
    db: env.DB_NAME,
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: encodeURIComponent(env.DB_USER),
    password: encodeURIComponent(env.DB_PASSWORD),
    collection: 'migrations',
    directory: './migrations'
};
