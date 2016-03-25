'use strict';

const proxyquire = require('proxyquire');

describe('bootstrap', () => {

    let sut,
        app;
    const controllers = {};

    beforeEach(() => {
        sut = proxyquire('./index', {
            '../controllers': controllers
        });

        app = {
            use: env.spy(() => app)
        };
    });

    it('should add controllers to app', () => {
        sut(app);
        app.use.should.been.calledWith(controllers);
    });

    it('should return app instance', () => {
        sut(app).should.equal(app);
    });

});

