'use strict';

const path = require('path'),
    User = require(path.resolve('./controllers/api/models/user')),
    BaseController = require(path.resolve('./common/base.controller'));

module.exports = class ProfileController extends BaseController {
    constructor() {
        super(User);
    }

    createGetOptions(req) {
        const baserOptions = super.createGetOptions(req);
        Object.assign(baserOptions, {
            select: {
                photo: 1,
                fullName: 1,
                rating: 1
            }
        });
        return baserOptions;
    }

    createFindByIdRequest(req, res) {
        return super.createFindByIdRequest(req, res)
            .select({
                photo: 1,
                fullName: 1,
                rating: 1,
                locations: 1,
                categories: 1,
                registerDate: 1,
                lastLogin: 1,
                'facebook.id': 2,
                'google.id': 2
            });
    }

    processGetByIdResult(result) {
        const baseResult = super.processGetByIdResult(result);
        const social = (baseResult.social = []);
        const facebookId = baseResult.facebook && baseResult.facebook.id;
        if (facebookId) {
            social.push({
                type: 'FACEBOOK',
                url: `https://www.facebook.com/${facebookId}`
            });
            delete baseResult.facebook;
        }
        const googleId = baseResult.google && baseResult.google.id;
        if (googleId) {
            social.push({
                type: 'GOOGLE_PLUS',
                url: `https://plus.google.com/${googleId}`
            });
            delete baseResult.google;
        }
        return baseResult;
    }

};
