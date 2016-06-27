'use strict';
const proxyquire = require('proxyquire').noCallThru();

describe('challenges/controller', () => {
    let sut,
        req,
        res,
        next,
        Challenge,
        mockChallenges,
        mockChallenge,
        imageService,
        saveImageResp;

    beforeEach(() => {
        res = {
            json: env.spy()
        };

        next = env.spy();

        saveImageResp = 'testImagePath';

        const mockPromise = {
            then: (cb) => {
                cb(saveImageResp);
                return {
                    then: (successCb) => {
                        successCb(mockChallenge);
                        return {
                            then: (callBack) => {
                                callBack(mockChallenge);
                            }
                        };
                    }
                };
            }
        };

        imageService = {
            saveImage: env.stub().returns(mockPromise)
        };

        mockChallenges = [1, 2, 3];

        const mockResponseForChallenges = {
            then: (successCb) => (successCb(mockChallenges))
        };

        mockChallenge = {
            categories: [
                'testCategory'
            ],
            image: saveImageResp
        };

        const mockResponseForChallenge = {
            then: (successCb) => successCb(mockChallenge)
        };

        Challenge = {
            create: env.stub().returns(mockResponseForChallenge),
            find: env.spy(() => Challenge),
            populate: env.stub().returns(mockResponseForChallenges)
        };

        sut = proxyquire('./controller', {
            '../../models/challenge': Challenge,
            '../../../../common/imageService': imageService
        });
    });

    describe('getAll', () => {
        beforeEach(() => {
            req = {};
            sut.getAll(req, res);
        });

        it('should find challenges in db', () => {
            Challenge.find.should.been.calledWith({});
        });

        it('should find challenges with populated user', () => {
            Challenge.populate.should.been.calledWith('user');
        });

        it('should send response with challenges from db', () => {
            res.json.should.been.calledWith(mockChallenges);
        });
    });

    xdescribe('post', () => {
        const image = 'image';

        beforeEach(() => {
            req = {
                body: {
                    image,
                    categories: [
                        'testCategory'
                    ]
                }
            };
            sut.create(req, res, next);
        });

        it('should save challenge to db', () => {
            Challenge.create.should.been.calledWith(mockChallenge);
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
            Challenge.create
                .should.been.calledWith(
                sinon.match({ image: saveImageResp })
            );
        });
    });
});
