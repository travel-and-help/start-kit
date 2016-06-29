'use strict';

const proxyquire = require('proxyquire').noCallThru();

describe('controllers/api/challenge', () => {
    let sut,
        router,
        challengeController,
        controllerInstance,
        authService,
        imageService;

    beforeEach(() => {

        router = env.stubChain(['route', 'get', 'use', 'post']);
        authService = { restrictUnauthenticated: env.stub() };

        controllerInstance = {
            getById: env.spy(),
            get: env.spy(),
            update: env.spy(),
            complete: env.spy(),
            search: env.spy()
        };

        imageService = {
            saveImage: env.stub()
        };

        challengeController = function ProfileController() {
            return controllerInstance;
        };

        const express = {
            Router: env.stub().returns(router)
        };

        sut = proxyquire('./index', {
            express,
            './challenge.controller': challengeController,
            '../../../auth/auth.service': authService,
            '../../../../common/imageService': imageService
        });
    });

    it('should export router', () => {
        sut.should.equal(router);
    });

    it('should register route for getting all challenges', () => {
        router.route.should.calledWith('/');
        const onGetCallback = router.get.getCall(0).args[0];
        onGetCallback({}, {});
        controllerInstance.get.should.calledWith({}, {});
    });

    it('should register search router', () => {
        router.route.should.calledWith('/search');
        const onSearchCallback = router.get.getCall(1).args[0];
        onSearchCallback({}, {});
        controllerInstance.search.should.calledWith({}, {});
    });

    it('should register complete challenge router', () => {
        router.route.should.calledWith('/:id/complete');
        const onCompleteCallback = router.post.lastCall.args[2];
        onCompleteCallback({}, {});
        controllerInstance.complete.should.calledWith({}, {});
    });

    it('should save image before complete', (done) => {
        router.route.should.calledWith('/:id/complete');
        imageService.saveImage.resolves('testUrl');
        const saveImageMiddleware = router.post.lastCall.args[1];
        const next = env.stub();
        const request = {
            body: {
                image: 'test image data'
            }
        };
        saveImageMiddleware(request, {}, next)
            .then(() => {
                request.body.image.should.equal('testUrl');
                next.should.calledWith();
                done();
            });

    });

    it('should register single get router', () => {
        router.route.should.calledWith('/:id');
        router.get.should.calledWith();
        const onGetCallback = router.get.lastCall.args[0];
        onGetCallback({}, {});
        controllerInstance.getById.should.calledWith({}, {});
    });

});

