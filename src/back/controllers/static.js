'use strict';

const
    express = require('express'),
    router = express.Router,
    config = require('../../../webpack');

module.exports = router()
    .use(express.static(config.output.path));
