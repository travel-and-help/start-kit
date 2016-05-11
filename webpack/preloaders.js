'use strict';

module.exports = [
    {
        test: /\.scss$/,
        loader: 'import-glob-loader'
    },
    {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
    }
];
