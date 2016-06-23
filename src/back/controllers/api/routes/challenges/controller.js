'use strict';

const Q = require('q');
const extend = require('util')._extend;
// in newer versions of node where destructuring or Object.assign is supported extend should be removed
const Challenge = require('../../models/challenge');
const imageService = require('../../../../common/imageService');

const controller = () => {
    const update = (_id, body) => (
        Challenge.update({ _id }, body)
    );

    const get = (req, res, next) => {
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
                body.image = imagePath;
                return body;
            }, next)
            .then(Challenge.create, next)
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

    return {
        /* eslint-disable */
        // lint should be disabled cause in current versions of node property shorthand is not supported
        get: get,
        create: create,
        edit: edit
    };
};

module.exports = controller();
