'use strict';

const
    webpack = require('webpack'),
    plugins = require('./plugins'),
    devServer = require('./devServer');

module.exports = {
    devtool: 'eval',
    eslint: {
        configFile: '.eslintrc.browser.json'
    },
    plugins: [].concat(
        new webpack.HotModuleReplacementPlugin(),
        plugins
    ),
    devServer
};
