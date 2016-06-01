'use strict';

const
    webpack = require('webpack'),
    env = require('../env'),
    layout = require('../layout'),
    Html = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    path = require('path'),
    SvgStore = require('webpack-svgstore-plugin');

module.exports = [
    new webpack.DefinePlugin({
        'process.env': JSON.stringify({
            NODE_ENV: env.NODE_ENV,
            PLATFORM: env.PLATFORM,
            API_BASE_URL: env.API_BASE_URL
        })
    }),
    new Html({
        template: layout.src.front.htmlEntry
    }),
    new ExtractTextPlugin('app.css', {
        allChunks: true
    }),
    new SvgStore(
        path.join(layout.src.frontDir, 'app', 'common', 'icons', '*.svg'),
        '',
        {
            name: 'icons.svg',
            chunk: 'main',
            prefix: 'th-',
            svgoOptions: {
                plugins: [
                    { collapseGroups: true },
                    { transformsWithOnePath: true },
                    { convertPathData: true },
                    { cleanupIDs: true },
                    { removeAttrs: {
                        attrs: ['fill']
                    }}
                ]
            }
        }
    )
];
