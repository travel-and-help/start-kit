'use strict';

const
    layout = require('../layout'),
    env = require('../env');

module.exports = {
    contentBase: layout.target.buildDir,
    hot: true,
    inline: true,
    progress: true,
    host: '0.0.0.0',
    port: env.PORT + 1
};
