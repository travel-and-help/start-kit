'use strict';

const proxyquire = require('proxyquire');

describe('controllers/static', () => {
    let sut,
        express,
        webpackConfig,
        router;

    const staticMiddleware = {};

    beforeEach(() => {

        router = {
            use: env.spy(() => router)
        };

        express = {
            static: env.stub().returns(staticMiddleware),
            Router: env.stub().returns(router)
        };

        webpackConfig = {
            output: {
                path: {}
            }
        };

        sut = proxyquire('./static', {
            express,
            '../../../webpack': webpackConfig
        });
    });

    it('should register static middleware', () => {
        router.use.should.been.calledWith(staticMiddleware);
    });

    it('should serve static files from used webpack output directory', () => {
        express.static.should.been.calledWith(webpackConfig.output.path);
    });

    it('should export router', () => {
        sut.should.equal(router);
    });

});

