'use strict';

const router = require('express').Router;
const challengesController = require('../../../challenges/controller');

module.exports = router()
    .get('/', challengesController.getAll)
    .put('/:id', challengesController.edit)
    .post('/', challengesController.create);
