'use strict';

const imageHostingUrl = require('../../../env').IMAGE_HOSTING_URL;
const request = require('request');
const Q = require('q');

const saveToExtHost = (base64) => {
    // Image should be converted to  base64
    const deferred = Q.defer();
    const url = `${imageHostingUrl}/picture`;
    const imageBuffer = new Buffer(base64, 'base64');
    const formData = {
        file: {
            value: imageBuffer,
            options: {
                filename: `${imageBuffer.length}${Date.now()}`,
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
                deferred.reject(error);
            } else if (respBody) {
                const path = JSON.parse(respBody).path;
                deferred.resolve(`${imageHostingUrl}/${path}`);
            } else {
                deferred.reject(new Error('ExternalServiceError'));
            }
        }
    );
    return deferred.promise;
};

const saveCategoryImage = (/* categoryId */) => (
    // TODO find category picture
    Q.resolve('http://placekitten.com/400/400')
);

const saveImage = (options) => {
    const image = options.image;
    if (image) {
        return saveToExtHost(image);
    }
    return saveCategoryImage(options.category);
};

module.exports = {
    saveImage
};
