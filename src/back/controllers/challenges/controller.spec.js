'use strict';
const proxyquire = require('proxyquire');

describe('challenges/controller', () => {
    let sut,
        req,
        res,
        next,
        Challenge,
        mockChallenges,
        mockChallenge,
        q,
        util,
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
            update: env.stub().returns(mockResponseForChallenge),
            find: env.spy(() => Challenge),
            populate: env.stub().returns(mockResponseForChallenges)
        };

        q = {
            resolve: env.stub().returns(mockResponseForChallenge),
            reject: env.spy()
        };

        util = {
            _extend: env.stub().returnsArg(1)
        };

        sut = proxyquire('./controller', {
            '../../models/challenge': Challenge,
            '../../common/imageService': imageService,
            util,
            q
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

    describe('create', () => {
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

    describe('edit', () => {
        describe('with image', () => {
            const image = 'image';
            const body = {
                image
            };

            beforeEach(() => {
                req = {
                    params: {
                        id: 'id'
                    },
                    body
                };
                sut.edit(req, res, next);
            });

            it('should copy request body', () => {
                util._extend.should.been.calledWith({}, body);
            });

            it('should save new image', () => {
                imageService.saveImage.should.been.calledWith({ image });
            });

            it('should update existing challenge', () => {
                Challenge.update.should.been.calledWith(
                    { _id: req.params.id },
                    mockChallenge
                );
            });

            it('should send updated challenge back', () => {
                res.json.should.been.calledWith(mockChallenge);
            });
        });

        describe('without image', () => {
            const body = {};
            beforeEach(() => {
                req = {
                    params: {
                        id: 'id'
                    },
                    body
                };
                sut.edit(req, res, next);
            });

            it('should resolve promise with body without image', () => {
                q.resolve.should.been.calledWith(body);
            });

            it('should NOT call service to save image', () => {
                const checkAssertion = () => (
                    imageService.saveImage.should.not.been.called
                );
                checkAssertion();
            });
        });
    });
});
