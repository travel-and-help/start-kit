'use strict';

const path = require('path'),
    Challenge = require(path.resolve('./models/challenge')),
    BaseController = require(path.resolve('./common/base.controller'));

class ChallengeController extends BaseController {
    constructor() {
        super(Challenge);
    }

    createGetOptions(req) {
        const baserOptions = super.createGetOptions(req);
        Object.assign(baserOptions, {
            select: {
                title: 1,
                level: 1,
                image: 1,
                location: 1,
                categories: 1,
                user: 1
            },
            populate: 'user'
        });
        return baserOptions;
    }

    createFindByIdRequest(req, res) {
        return super.createFindByIdRequest(req, res)
            .select({
                title: 1,
                description: 1,
                level: 1,
                image: 1,
                location: 1,
                categories: 1,
                user: 1
            })
            .populate('user');
    }

    complete(req, res) {
        return req.getCurrentUser()
            .then(userInstance => userInstance.completeChallenge(req.params.id))
            .then(result => this.processSuccess(req, res, result || {}))
            .catch(err => this.processError(req, res, err));
    }

    search(req, res) {
        return this.get(req, res);
    }

}

module.exports = ChallengeController;
