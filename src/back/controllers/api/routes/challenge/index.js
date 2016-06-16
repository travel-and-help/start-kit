'use strict';

const routerConstructor = require('express').Router,
    ChallengeController = require('./challenge.controller'),
    restrictUnauthenticated = require('../../../auth/auth.service').restrictUnauthenticated;

const controller = new ChallengeController();
const router = routerConstructor();
router.route('/')
    .get((req, res) => (controller.get(req, res)));

router.route('/search')
    .get((req, res) => (controller.search(req, res)));

router.route('/user/:userId/status/:statusId')
    .get((req, res) => (controller.getUsersChallenges(req, res)));

router.route('/:id/complete')
    .post(restrictUnauthenticated, (req, res) => (controller.complete(req, res)));

router.route('/:id')
    .get((req, res) => (controller.getById(req, res)));

module.exports = router;
