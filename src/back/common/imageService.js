'use strict';

const imageHostingUrl = require('../../../env').IMAGE_HOSTING_URL;
const request = require('request');
const q = require('q');

const imageService = () => {

    const saveToExtHost = (base64, deferred) => {
        // Image should be converted to  base64
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

    };

    const saveCategoryImage = (categoryId, deferred) => {
        // TODO find category picture
        deferred.resolve('http://placekitten.com/400/400');
    };

    const saveImage = (options) => {
        const deferred = q.defer();
        const image = options.image;
        if (image) {
            saveToExtHost(image, deferred);
        } else {
            saveCategoryImage(options.category, deferred);
        }
        return deferred.promise;
    };

    return {
        saveImage
    };
};

module.exports = imageService();
