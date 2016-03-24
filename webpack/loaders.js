'use strict';

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [
    {
        test: /\.js?$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel']
    },
    {
        test: /\.(woff|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'base64-font-loader'
    },
    {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!sass!import-glob-loader')
    },
    {
        test: /\.png$/,
        loader: 'file?name=sprite.[ext]'
    }
];
