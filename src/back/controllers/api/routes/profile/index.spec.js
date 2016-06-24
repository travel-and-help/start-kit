'use strict';

const proxyquire = require('proxyquire').noCallThru();

describe('/api/profile', () => {

    const req = 'req',
        res = 'res',
        my = 'my';

    let sut,
        router,
        profileCtrl;

    beforeEach(() => {

        router = {
            use: env.spy(() => router),
            get: env.spy(() => router),
            post: env.spy(() => router)
        };

        profileCtrl = {
            getById: env.stub(),
            update: env.stub()
        };

        sut = proxyquire('./index', {
            express: {
                Router: env.stub().returns(router)
            },
            './profile.controller': env.stub().returns(profileCtrl),
            './my': my
        });

    });

    it('should export routes', () => {
        sut.should.equal(router);
    });

    it('should register my profile routes', () => {
        router.use.should.been.calledWith('/my', my);
    });

    it('should get user profile by id', () => {
        router.get.firstCall.args[0].should.equal('/:id');
    });

    it('should respond with user profile on get', () => {
        router.get.firstCall.args[1](req, res);
        profileCtrl.getById.should.been.calledWith(req, res);
    });

});
