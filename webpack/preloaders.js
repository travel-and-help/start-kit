'use strict';

module.exports = [
    {
        test: /\.scss$/,
        loader: 'import-glob'
    },
    {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
    }
];
