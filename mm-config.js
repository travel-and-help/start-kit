const env = require('./env');

module.exports = {
    db: env.DB_NAME,
    host: env.DB_HOST,
    port: env.DB_PORT,
    collection: 'migrations',
    directory: './migrations'
};
