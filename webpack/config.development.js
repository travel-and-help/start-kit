'use strict';

const
    webpack = require('webpack'),
    plugins = require('./plugins'),
    layout = require('../layout'),
    devServer = require('./devServer');

module.exports = {
    devtool: 'eval',
    output: {
        path: layout.target.buildDir,
        filename: 'app.js'
    },
    plugins: [].concat(
        new webpack.HotModuleReplacementPlugin(),
        plugins
    ),
    devServer
};
