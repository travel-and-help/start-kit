module.exports = function (config) {
    config.set({
        frameworks: ['mocha'],
        preprocessors: {
            'src/**/*.js': ['babel'],
            'test/**/*.js': ['babel']
        },
        babelPreprocessor: {
            options: {
                presets: ['es2015'],
                sourceMap: 'inline'
            },
            filename: function (file) {
                return file.originalPath.replace(/\.js$/, '.es5.js');
            },
            sourceFileName: function (file) {
                return file.originalPath;
            }
        },
        'plugins' : [
            'karma-mocha'
        ],
        files: [
            '*.js'
        ],
        client: {
            mocha: {
                reporter: 'html', // change Karma's debug.html to the mocha web reporter
                ui: 'tdd'
            }
        }
    });

};
