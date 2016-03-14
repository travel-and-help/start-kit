'use strict';

const
    glob = require('glob'),
    path = require('path');

require('./testConfig');

const SPECS_PATTERN = path.join(__dirname, '../src/back/**/*.spec.js');

glob.sync(SPECS_PATTERN).forEach(spec => require(spec));
