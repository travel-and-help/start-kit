'use strict';

const
    webpack = require('webpack'),
    plugins = require('./plugins'),
    layout = require('../layout');

module.exports = {
    output: {
        path: layout.target.releaseDir,
        filename: 'app.js'
    },
    plugins: [].concat(
        new webpack.optimize.UglifyJsPlugin(),
        plugins
    )
};
