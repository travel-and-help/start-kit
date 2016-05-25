'use strict';

const path = require('path');
const User = require(path.resolve('./controllers/api/models/user'));
const BaseController = require(path.resolve('./common/base.controller'));

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
                rating: 1,
                locations: 1,
                categories: 1
            }
        });
        return baserOptions;
    }

    getFindByIdRequest(req, res) {
        const request = super.createFindByIdRequest(req, res);
        request.select({
            photo: 1,
            fullName: 1,
            rating: 1,
            locations: 1,
            categories: 1
        });
        return request;
    }


};
