'use strict';

const Q = require('q');
const extend = require('util')._extend;
// in versions of node where destructuring or Object.assign is supported extend should be removed
const Challenge = require('../../models/challenge');
const imageService = require('../../common/imageService');

const update = (_id, body) => (
    Challenge.update({ _id }, body)
);

const getAll = (req, res, next) => {
    Challenge
        .find({})
        .populate('user')
        .then((challenges) => {
            res.json(challenges);
        }, next);
};

const create = (req, res, next) => {
    const body = req.body;
    const imageOptions = {
        image: body.image,
        category: body.categories[0]
    };
    imageService
        .saveImage(imageOptions)
        .then((imagePath) => {
            const newBody = extend({}, body);
            return extend(newBody, { image: imagePath });
        }, next)
        .then((challenge) => (
            Challenge.create(challenge)
        ), next)
        .then((challenge) => {
            res.json(challenge);
        }, next);
};

const editImage = (body) => {
    const challenge = extend({}, body);
    const image = challenge.image;
    if (image) {
        return imageService
            .saveImage({ image })
            .then((imagePath) => extend(challenge, { image: imagePath }));
    }
    return Q.resolve(body);
};

const edit = (req, res, next) => {
    const body = req.body;
    editImage(body)
        .then((challenge) => update(req.params.id, challenge))
        .then((challenge) => {
            res.json(challenge);
        }, next);
};

module.exports = {
    getAll,
    create,
    edit
};
