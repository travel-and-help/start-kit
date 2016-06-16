'use strict';

const proxyquire = require('proxyquire').noCallThru();

describe('controllers/api/challenge', () => {
    let sut,
        router,
        challengeController,
        controllerInstance,
        authService;

    beforeEach(() => {

        router = {
            use: env.spy(() => router),
            get: env.spy(() => router),
            post: env.spy(() => router),
            route: env.spy(() => router)
        };
        authService = { restrictUnauthenticated: env.stub() };

        controllerInstance = {
            getById: env.spy(),
            get: env.spy(),
            update: env.spy(),
            getUsersChallenges: env.spy(),
            complete: env.spy(),
            search: env.spy()
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
            '../../../auth/auth.service': authService
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

    it('should register router for user challenges', () => {
        router.route.should.calledWith('/user/:userId/status/:statusId');
        router.get.should.calledWith();
        const onGetCallback = router.get.getCall(2).args[0];
        onGetCallback({}, {});
        controllerInstance.getUsersChallenges.should.calledWith({}, {});
    });

    it('should register complete challenge router', () => {
        router.route.should.calledWith('/:id/complete');
        const onCompleteCallback = router.post.lastCall.args[1];
        onCompleteCallback({}, {});
        controllerInstance.complete.should.calledWith({}, {});
    });

    it('should register single get router', () => {
        router.route.should.calledWith('/:id');
        router.get.should.calledWith();
        const onGetCallback = router.get.lastCall.args[0];
        onGetCallback({}, {});
        controllerInstance.getById.should.calledWith({}, {});
    });

});

