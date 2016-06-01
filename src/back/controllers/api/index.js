'use strict';
const router = require('express').Router;

module.exports = router()
    .use('/myprofile', require('./routes/myprofile'))
    .use('/challenges', require('./routes/challenges'))
    .use('/challenge', require('./routes/challenge'))
    .use('/categories', require('./routes/categories'))
    .use('/profile', require('./routes/profile'))
    .use('/my', require('./routes/my'));
