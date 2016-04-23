'use strict';

const
    webpack = require('webpack'),
    plugins = require('./plugins');

module.exports = {
    plugins: [].concat(
        new webpack.optimize.UglifyJsPlugin(),
        plugins
    )
};
