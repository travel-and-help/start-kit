'use strict';

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [
    {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
            plugins: ['react-html-attrs']
        }
    },
    {
        test: /\.(woff|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'base64-font-loader'
    },
    {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!csscomb!sass!import-glob-loader!postcss')
    },
    {
        test: /\.(png|jpg)$/,
        loader: 'file-loader?name=images/[name].[ext]'
    }
];
