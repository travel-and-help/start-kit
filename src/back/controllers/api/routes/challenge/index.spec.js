'use strict';

const proxyquire = require('proxyquire').noCallThru();

describe('controllers/api/challenge', () => {
    let sut,
        router,
        challengeController,
        controllerInstance;

    beforeEach(() => {

        router = {
            use: env.spy(() => router),
            get: env.spy(() => router),
            post: env.spy(() => router),
            route: env.spy(() => router)
        };

        controllerInstance = {
            getById: env.spy(),
            get: env.spy(),
            update: env.spy(),
            getUsersChallenges: env.spy()
        };

        challengeController = function ProfileController() {
            return controllerInstance;
        };

        const express = {
            Router: env.stub().returns(router)
        };

        sut = proxyquire('./index', {
            express,
            './challenge.controller': challengeController
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

    it('should register router for user challenges', () => {
        router.route.should.calledWith('/user/:userId/status/:statusId');
        router.get.should.calledWith();
        const onGetCallback = router.get.getCall(1).args[0];
        onGetCallback({}, {});
        controllerInstance.getUsersChallenges.should.calledWith({}, {});
    });

    it('should register single get router', () => {
        router.route.should.calledWith('/:id');
        router.get.should.calledWith();
        const onGetCallback = router.get.lastCall.args[0];
        onGetCallback({}, {});
        controllerInstance.getById.should.calledWith({}, {});
    });

});

