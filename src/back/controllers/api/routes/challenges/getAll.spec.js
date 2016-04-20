'use strict';
const proxyquire = require('proxyquire');


describe('routes/challenges-getAll', () => {
    let sut,
        req,
        res,
        challenge,
        mockChallenges;

    beforeEach(() => {

        req = {};
        res = {
            json: env.spy()
        };
        mockChallenges = [1, 2, 3];

        challenge = {
            find: env.spy((query, cb) => {
                cb(null, mockChallenges);
            })
        };

        sut = proxyquire('./getAll', {
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
