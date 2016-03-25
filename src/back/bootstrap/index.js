'use strict';

const
    preMiddleware = require('./preMiddleware'),
    controllers = require('../controllers');

module.exports = (app) => {
    preMiddleware(app);
    return app.use(controllers);
};
