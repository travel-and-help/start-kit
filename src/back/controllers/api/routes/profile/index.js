'use strict';

const router = require('express').Router(),
    ProfileController = require('./profile.controller');

const controller = new ProfileController();

router.route('/')
    .get(controller.get.bind(controller));

router.route('/:id')
    .get(controller.getById.bind(controller))
    .put(controller.update.bind(controller));

module.exports = router;
