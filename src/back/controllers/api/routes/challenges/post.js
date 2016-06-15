'use strict';

const Challenge = require('../../models/challenge');
const request = require('request');

const newPost = (req, res, next) => {
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
    const url = 'http://ec2-52-35-85-119.us-west-2.compute.amazonaws.com:8080/picture';

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
                const newBody = JSON.parse(JSON.stringify(body));
                newBody.image = `http://ec2-52-35-85-119.us-west-2.compute.amazonaws.com:8080/${path}`;

                const model = new Challenge(newBody);
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
