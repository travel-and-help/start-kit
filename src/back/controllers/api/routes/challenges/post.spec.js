'use strict';

const proxyquire = require('proxyquire');


describe('routes/challenges-post', () => {
    let sut,
        req,
        res,
        save,
        mockChallenge,
        Challenge;

    beforeEach(() => {
        mockChallenge = {
            title: 'Test Title'
        };

        req = {
            body: mockChallenge
        };

        res = {
            json: env.spy()
        };

        save = env.spy((cb) => {
            cb(null, mockChallenge);
        });

        Challenge = function() {
            return {
                save: save
            }
        };

        sut = proxyquire('./post', {
            '../../models/challenge': Challenge
        });

        sut(req, res);
    });


    it('should save challenge to db', () => {
        save.should.been.calledWith(sinon.match.func);
    });

    it('should send response with new challenges from db', () => {
        res.json.should.been.calledWith(mockChallenge)
    });
});
