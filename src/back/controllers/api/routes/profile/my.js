'use strict';

const router = require('express').Router;
const authService = require('../../../auth/auth.service');
const MyProfileController = require('./myProfile.controller');

const myProfileCtrl = new MyProfileController();

module.exports = router()
    .use(authService.restrictUnauthenticated)
    .get('', (req, res) => myProfileCtrl.getById(req, res))
    .post('', (req, res) => myProfileCtrl.update(req, res));
