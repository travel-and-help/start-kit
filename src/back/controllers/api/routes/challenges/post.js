'use strict';

const Challenge = require('../../models/challenge');
const request = require('request');

const newPost = (req, res) => {
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
            if (!error && respBody) {
                const path =  JSON.parse(respBody).path;
                body.image = `$http://ec2-52-35-85-119.us-west-2.compute.amazonaws.com:8080/${path}`;
                const model = new Challenge(body);

                model.save((err, challenge) => {
                    if (!err) {
                        res.json(challenge);
                    } else {
                        res.status(400).send(err);
                    }
                });
            }
            res.json('bad response from external hosting');
        }
    );
};

module.exports = newPost;
