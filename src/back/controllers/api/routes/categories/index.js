'use strict';

const routerConstructor = require('express').Router;
const categories = require('./categories');
const restrictUnauthenticated = require('../../../auth/auth.service').restrictUnauthenticated;

const router = routerConstructor();

router.route('/')
    .get(categories.getAll)
    .post(restrictUnauthenticated, categories.save);

module.exports = router;
