'use strict';

const
    webpack = require('webpack'),
    env = require('../env'),
    layout = require('../layout'),
    Html = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [
    new webpack.DefinePlugin({
        'process.env': JSON.stringify({
            NODE_ENV: env.NODE_ENV
        })
    }),
    new Html({
        template: layout.src.front.htmlEntry
    }),
    new ExtractTextPlugin('app.css', {
        allChunks: true
    })
];
