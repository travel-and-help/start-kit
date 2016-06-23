'use strict';

const router = require('express').Router;
const controller = require('./controller');

module.exports = router()
    .get('/', controller.get)
    .put('/:id', controller.edit)
    .post('/', controller.create);
