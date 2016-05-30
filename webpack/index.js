'use strict';

const
    env = require('../env'),
    layout = require('../layout'),
    logEnv = require('../env/log'),
    loaders = require('./loaders'),
    preLoaders = require('./preloaders'),
    autoprefixer = require('autoprefixer'),
    inlineSvg = require('postcss-inline-svg');

logEnv(env);

module.exports = Object.assign({
    target: 'web',
    entry: layout.src.front.jsEntry,
    output: {
        path: getTargetPathForEnv(env),
        filename: 'app.js'
    },
    module: {
        preLoaders,
        loaders
    },
    postcss: () => ([
        inlineSvg(),
        autoprefixer({
            browsers: ['android 4', 'ios_saf 8']
        })
    ])

}, getConfigForEnv(env));

function getConfigForEnv(environment) {
    if (environment.NODE_ENV === 'production') {
        return require('./config.production');
    }
    return require('./config.development');
}

function getTargetPathForEnv(environment) {
    if (environment.PLATFORM === 'cordova') {
        return layout.target.cordovaDir;
    }

    if (environment.NODE_ENV === 'production') {
        return layout.target.releaseDir;
    }

    return layout.target.buildDir;
}
