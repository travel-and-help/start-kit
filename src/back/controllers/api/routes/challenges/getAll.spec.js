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

        challenge = {
            find: env.spy((query, cb) => {
                cb(null, mockChallenges);
            })
        };

        const sut = proxyquire('./getAll', {
            '../../models/challenge': challenge
        });

        sut(req, res);
    });

    it('should find challenges in db', () => {
        challenge.find.should.been.calledWith({}, sinon.match.func);
    });

    it('should send response with challenges from db', () => {
        res.json.should.been.calledWith(mockChallenges);
    });

});
