'use strict';

const proxyquire = require('proxyquire').noCallThru();

describe('controllers/api/profile', () => {
    let sut,
        router,
        profileController,
        authService,
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
            update: env.spy()
        };

        profileController = function ProfileController() {
            return controllerInstance;
        };

        authService = {
            restrictUnauthenticated: env.spy()
        };

        const express = {
            Router: env.stub().returns(router)
        };

        sut = proxyquire('./index', {
            express,
            './profile.controller': profileController,
            '../../../auth/auth.service': authService
        });
    });

    it('should export router', () => {
        sut.should.equal(router);
    });

    it('should register route for getting all profiles', () => {
        router.route.should.calledWith('/');
        const onGetCallback = router.get.getCall(0).args[0];
        onGetCallback({}, {});
        controllerInstance.get.should.calledWith({}, {});
    });

    it('should register single get router', () => {
        router.route.should.calledWith('/:id');
        router.get.should.calledWith();
        const onGetCallback = router.get.lastCall.args[0];
        onGetCallback({}, {});
        controllerInstance.getById.should.calledWith({}, {});
    });

    it('should register post router', () => {
        router.route.should.calledWith('/:id');
        router.post.should.calledWith();
        const onUpdateCallback = router.post.lastCall.args[1];
        onUpdateCallback({}, {});
        controllerInstance.update.should.calledWith({}, {});
    });

});

