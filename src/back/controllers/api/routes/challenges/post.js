'use strict';

const Challenge = require('../../models/challenge');
const request = require('request');

const newPost = (req, res) => {
    const baseHostingUrl = 'http://ec2-52-35-85-119.us-west-2.compute.amazonaws.com:8080/';
    const url = `${baseHostingUrl}picture`;
    const imageBuffer = new Buffer(req.body.image, 'base64');
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
            if (!error && respBody && respBody.path) {
                console.log(respBody, respBody.path);
                const body = JSON.parse(JSON.stringify(req.body));
                body.image = `${baseHostingUrl}${respBody.path}`;
                const model = new Challenge(body);

                model.save((err, challenge) => {
                    if (!err) {
                        res.json(challenge);
                    } else {
                        res.status(400).send(err);
                    }
                });
            }
            res.json('no response from hosting');
        }
    );
};

module.exports = newPost;
