'use strict';
const proxyquire = require('proxyquire').noCallThru();

describe('challenges getOne', () => {
    let res,
        req,
        sut,
        challenge,
        mockChallenge;

    beforeEach(() => {

        req = { params: { id: 1 } };

        res = {
            json: env.spy()
        };
        mockChallenge = { 1: '1', 2: '2' };

        challenge = {
            findOne: env.spy((query, cb) => {
                cb(null, mockChallenge);
            })
        };

        sut = proxyquire('./getOne', {
            '../../models/challenge': challenge
        });

        sut(req, res);
    });

    it('should find challenge in db', () => {
        challenge.findOne.should.been.calledWith({ _id: req.params.id }, sinon.match.func);
    });

    it('should send response with challenge from db', () => {
        res.json.should.been.calledWith(mockChallenge);
    });

});
