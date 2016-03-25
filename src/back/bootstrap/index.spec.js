'use strict';

const proxyquire = require('proxyquire');

describe('bootstrap', () => {

    let sut,
        premiddleware,
        app;
    const controllers = {};

    beforeEach(() => {

        premiddleware = env.stub();

        sut = proxyquire('./index', {
            '../controllers': controllers,
            './preMiddleware': premiddleware
        });

        app = {
            use: env.spy(() => app)
        };
    });

    it('should add premiddleware to app', () => {
        sut(app);
        premiddleware.should.been.calledWith(app);
    });

    it('should add controllers to app', () => {
        sut(app);
        app.use.should.been.calledWith(controllers);
    });

    it('should return app instance', () => {
        sut(app).should.equal(app);
    });

});

