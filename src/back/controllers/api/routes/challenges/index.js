'use strict';

const router = require('express').Router;
const challengesController = require('./controller');

module.exports = router()
    .get('/', challengesController.get)
    .put('/:id', challengesController.edit)
    .post('/', challengesController.create);
