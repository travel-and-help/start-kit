'use strict';

const
    env = require('../env'),
    layout = require('../layout'),
    logEnv = require('../env/log'),
    loaders = require('./loaders'),
    autoprefixer = require('autoprefixer');

logEnv(env);

module.exports = Object.assign({
    target: 'web',
    entry: layout.src.front.jsEntry,
    module: {
        preloaders: [{
            test: /\.scss$/,
            loaders: 'import-glob-loader'
        }],
        loaders
    },
    postcss: () => ([
        autoprefixer({ browsers: ["and_chr 49", "Android 4.3", "ios_saf 8.4", "bb 10", "ie_mob 11"] })
    ])

}, getConfigForEnv(env));

function getConfigForEnv(environment) {
    if (environment.NODE_ENV === 'production') {
        return require('./config.production');
    }
    return require('./config.development');
}
