'use strict';

const router = require('express').Router;
const ProfileController = require('./profile.controller');

const profileCtrl = new ProfileController();

module.exports = router()
    .use('/my', require('./my'))
    .get('/:id', (req, res) => profileCtrl.getById(req, res));
