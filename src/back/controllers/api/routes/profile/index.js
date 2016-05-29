'use strict';

const routerConstructor = require('express').Router,
    ProfileController = require('./profile.controller'),
    authService = require('../../../auth/auth.service');

const controller = new ProfileController();
const router = routerConstructor();
router.route('/')
    .get((req, res) => (controller.get(req, res)));

router.route('/:id')
    .get((req, res) => (controller.getById(req, res)))
    .post(
        authService.restrictUnauthenticated,
        (req, res) => (controller.update(req, res))
    );

module.exports = router;
