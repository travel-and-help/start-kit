'use strict';

const proxyquire = require('proxyquire');

describe('routes/challenges-post', () => {
    let sut,
        req,
        res,
        next,
        save,
        mockChallenge,
        Challenge,
        mockModel,
        imageService,
        saveImageResp;

    beforeEach(() => {
        res = {
            json: env.spy()
        };

        save = env.spy((cb) => {
            cb(null, mockChallenge);
        });

        next = env.spy();

        mockModel = {
            save
        };

        const image = 'image';

        mockChallenge = {
            categories: [
                'testCategory'
            ]
        };

        req = {
            body: {
                image,
                categories: [
                    'testCategory'
                ]
            }
        };

        Challenge = env.stub().returns(mockModel);

        saveImageResp = 'testImagePath';

        const mockPromise = {
            then: (cb) => {
                cb(saveImageResp);
            }
        };

        imageService = {
            saveImage: env.stub().returns(mockPromise)
        };

        sut = proxyquire('./post', {
            '../../models/challenge': Challenge,
            '../../../../common/imageService': imageService
        });

        sut(req, res, next);
    });


    it('should save challenge to db', () => {
        save.should.been.calledWith(sinon.match.func);
    });

    it('should send response with new challenges from db', () => {
        res.json.should.been.calledWith(mockChallenge);
    });

    it('should call save image service with category', () => {
        imageService.saveImage
            .should.been.calledWith(
                sinon.match({
                    category: req.body.categories[0]
                })
            );
    });

    it('should create challenge with correct image', () => {
        Challenge
            .should.been.calledWith(
                sinon.match({ image: saveImageResp })
            );
    });

    it('should pass to middleware error thaht arrises from save', () => {
        const error = 'error';
        const saveCallBack = save.lastCall.args[0];

        saveCallBack(error);

        next.should.been.calledWith(error);
    });
});
