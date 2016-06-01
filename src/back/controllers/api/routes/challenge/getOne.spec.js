'use strict';
const proxyquire = require('proxyquire').noCallThru();

describe('challenges getOne', () => {
    let res,
        req,
        next,
        err,
        sut,
        challenge,
        mockChallenge;

    beforeEach(() => {
        req = { params: { id: 1 } };

        res = {
            json: env.spy()
        };

        next = env.spy();

        err = null;

        mockChallenge = { 1: '1', 2: '2' };

        challenge = {
            findById: env.spy((query, cb) => {
                cb(err, mockChallenge);
            })
        };

        sut = proxyquire('./getOne', {
            '../../models/challenge': challenge
        });
    });

    it('should find challenge in db', () => {
        sut(req, res, next);
        challenge.findById.should.been.calledWith(req.params.id, sinon.match.func);
    });

    it('should send response with challenge from db', () => {
        sut(req, res, next);
        res.json.should.been.calledWith(mockChallenge);
    });

    it('should handle error', () => {
        err = true;
        sut(req, res, next);
        next.should.been.calledWith(err);
    });

});
