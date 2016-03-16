'use strict';

const
    glob = require('glob'),
    path = require('path');

module.exports = (sourceDir) => {
    require('./testConfig');

    const SPECS_PATTERN = path.join(sourceDir, '/**/*.spec.js');

    glob.sync(SPECS_PATTERN).forEach(spec => require(spec));
};
