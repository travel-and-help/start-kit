'use strict';

const proxyquire = require('proxyquire').noCallThru();

describe('/api/profile/my', () => {

    const req = 'req',
        res = 'res';

    let sut,
        router,
        authService,
        myProfileCtrl;

    beforeEach(() => {

        router = {
            use: env.spy(() => router),
            get: env.spy(() => router),
            post: env.spy(() => router)
        };

        authService = {
            restrictUnauthenticated: env.stub()
        };

        myProfileCtrl = {
            getById: env.stub(),
            update: env.stub()
        };

        sut = proxyquire('./my', {
            express: {
                Router: env.stub().returns(router)
            },
            '../../../auth/auth.service': authService,
            './myProfile.controller': env.stub().returns(myProfileCtrl)
        });

    });

    it('should export routes', () => {
        sut.should.equal(router);
    });

    it('should require authorized user', () => {
        router.use.should.been.calledWith(authService.restrictUnauthenticated);
    });

    it('should respond with profile on get', () => {
        router.get.firstCall.args[1](req, res);
        myProfileCtrl.getById.should.been.calledWith(req, res);
    });

    it('should update profile on post', () => {
        router.post.firstCall.args[1](req, res);
        myProfileCtrl.update.should.been.calledWith(req, res);
    });

});
