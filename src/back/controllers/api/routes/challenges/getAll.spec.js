'use strict';
const proxyquire = require('proxyquire').noCallThru();

describe('routes/challenges-getAll', () => {
    let sut,
        req,
        res,
        challenge,
        mockChallenges,
        userData;

    beforeEach(() => {
        req = {
            getCurrentUser: env.stub()
        };
        res = {
            json: env.spy()
        };
        mockChallenges = [1, 2, 3];
        userData = {
            categories: [1, 2, 3]
        };
        const mockResponse = {
            then: (successCb) => (successCb(mockChallenges))
        };
        const returnedExec = {
            exec: env.stub().returns(mockResponse)
        };
        const returnedPopulate = {
            populate: env.stub().returns(returnedExec)
        };
        challenge = {
            find: env.stub().returns(returnedPopulate)
        };
        sut = proxyquire('./getAll', {
            '../../../../models/challenge': challenge
        });

    });

    it('should find challenges for authenticated users', () => {
        const expectedQuery = { categories: { $in: userData.categories } };

        req.getCurrentUser.resolves(userData);

        sut(req, res)
            .then(() => {
                challenge.find.should.not.been.calledWith(expectedQuery);
            });
    });

    it('should send response with challenges from db', () => {
        req.getCurrentUser.resolves(userData);

        sut(req, res)
            .then(() => {
                res.json.should.been.calledWith(mockChallenges);
            });
    });

});
