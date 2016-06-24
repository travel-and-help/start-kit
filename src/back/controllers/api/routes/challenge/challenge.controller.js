'use strict';

const path = require('path'),
    mongoose = require('mongoose'),
    Challenge = require(path.resolve('./controllers/api/models/challenge')),
    User = require(path.resolve('./controllers/api/models/user')),
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
            .populate('user categories');
    }

    getUsersChallenges(req, res) {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 3;
        return User.aggregate([
            { $unwind: '$challenges' },
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(req.params.userId),
                    'challenges.status': req.params.statusId
                }
            },
            {
                $project: {
                    challenge: '$challenges.challenge',
                    date: '$challenges.date'
                }
            }
        ])
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ date: 'desc' })
            .exec()
            .then((result) => {
                const model = this.getModel();
                const options = this.createGetOptions(req);
                const challengeIds = result.map((item) => (item.challenge));
                return model.paginate({
                    _id: { $in: challengeIds }
                }, options);
            })
            .then(result => result.docs)
            .then((result) => (this.processSuccess(req, res, result)))
            .catch((err) => (this.processError(req, res, err)));
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
