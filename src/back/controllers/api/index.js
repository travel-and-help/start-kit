'use strict';
const router = require('express').Router;

module.exports = router()
    .use('/myprofile', require('./routes/myprofile'))
    .use('/challenges', require('./routes/challenges'))
    .use('/categories', require('./routes/categories'));
