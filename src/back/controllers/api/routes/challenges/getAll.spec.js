'use strict';
const proxyquire = require('proxyquire').noCallThru();

describe('routes/challenges-getAll', () => {
    let res,
        challenge,
        mockChallenges;

    beforeEach(() => {
        const req = {};
        res = {
            json: env.spy()
        };
        mockChallenges = [1, 2, 3];
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
        const sut = proxyquire('./getAll', {
            '../../models/challenge': challenge
        });
        sut(req, res);
    });

    it('should find challenges in db', () => {
        challenge.find.should.been.calledWith({});
    });

    it('should send response with challenges from db', () => {
        res.json.should.been.calledWith(mockChallenges);
    });

});
