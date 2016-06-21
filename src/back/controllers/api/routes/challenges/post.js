'use strict';

const Challenge = require('../../models/challenge');
const imageService = require('../../../../common/imageService');

const post = (req, res, next) => {
    const body = req.body;
    const imageOptions = {
        image: body.image,
        category: body.categories[0]
    };

    imageService
        .saveImage(imageOptions)
        .then((imagePath) => {
            body.image = imagePath;

            const model = new Challenge(body);

            model.save((saveError, challenge) => {
                if (saveError) {
                    next(saveError);
                } else {
                    res.json(challenge);
                }
            });
        }, next);

};

module.exports = post;
