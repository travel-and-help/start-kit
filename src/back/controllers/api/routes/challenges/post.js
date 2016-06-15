'use strict';

const Challenge = require('../../models/challenge');
const request = require('request');
const imageHostingUrl = require('../../../../../../../env').IMAGE_HOSTING_URL;

const newPost = (req, res, next) => {
    const url = `${imageHostingUrl}/picture`;
    const body = req.body;
    const imageBuffer = new Buffer(body.image, 'base64');
    const formData = {
        file: {
            value: imageBuffer,
            options: {
                filename: `travelAndHelp${imageBuffer.length}`,
                contentType: 'image'
            }
        }
    };

    request.post(
        {
            url,
            formData
        },
        (error, httpResponse, respBody) => {
            if (error) {
                next(error);
            } else if (respBody) {
                const path = JSON.parse(respBody).path;
                body.image = `${imageHostingUrl}/${path}`;

                const model = new Challenge(body);
                model.save((saveError, challenge) => {
                    if (saveError) {
                        next(saveError);
                    } else {
                        res.json(challenge);
                    }
                });
            } else {
                next(new Error('ExternalServiceError'));
            }
        }
    );
};

module.exports = newPost;
