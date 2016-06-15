'use strict';

const proxyquire = require('proxyquire');


describe('routes/challenges-post', () => {
    let sut,
        req,
        res,
        save,
        mockChallenge,
        Challenge,
        mockModel,
        request,
        imgRemotePath;

    beforeEach(() => {
        mockChallenge = {
            title: 'Test Title',
            image: 'testImage'
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

        mockModel = {
            save
        };

        imgRemotePath = 'imgRemotePath';

        const postMockResp = JSON.stringify({
            path: imgRemotePath
        });

        request = {
            post: env.spy((opt, cb) => {
                cb(null, {}, postMockResp);
            })
        };

        Challenge = env.stub().returns(mockModel);

        sut = proxyquire('./post', {
            '../../models/challenge': Challenge,
            request
        });

        sut(req, res);
    });


    it('should save challenge to db', () => {
        save.should.been.calledWith(sinon.match.func);
    });

    it('should send response with new challenges from db', () => {
        res.json.should.been.calledWith(mockChallenge);
    });
});
