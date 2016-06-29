'use strict';

const routerConstructor = require('express').Router,
    ChallengeController = require('./challenge.controller'),
    restrictUnauthenticated = require('../../../auth/auth.service').restrictUnauthenticated,
    saveImage = require('../../../../common/imageService').saveImage;

const controller = new ChallengeController();
const router = routerConstructor();

function saveImageMiddleware(req, res, next) {
    const body = req.body;
    const image = body.image;
    if (!image) {
        return next();
    }
    const imageOptions = { image };
    return saveImage(imageOptions)
        .then(imagePath => {
            body.image = imagePath;
            next();
        })
        .catch(next);
}

router.route('/')
    .get((req, res) => (controller.get(req, res)));

router.route('/search')
    .get((req, res) => (controller.search(req, res)));

router.route('/:id/complete')
    .post(restrictUnauthenticated,
        saveImageMiddleware,
        (req, res) => (controller.complete(req, res)));

router.route('/:id')
    .get((req, res) => (controller.getById(req, res)));

module.exports = router;
