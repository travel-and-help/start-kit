/* eslint-disable no-console*/
'use strict';

const proxyquire = require('proxyquire');

describe('app', () => {

    const
        appEnv = {
            PORT: Math.random()
        };

    let bootstrap,
        expressApp,
        express;

    beforeEach(() => {

        expressApp = {
            listen: env.stub()
        };

        express = env.stub().returns(expressApp);

        bootstrap = env.stub().returnsArg(0);

        proxyquire('./index', {
            express,
            './bootstrap': bootstrap,
            '../../env': appEnv
        });

    });

    it('should create express app', () => {
        express.should.been.calledWith();
    });

    it('should bootstrap express app', () => {
        bootstrap.should.been.calledWith(expressApp);
    });

    it('should listen on environment port', () => {
        expressApp.listen.should.been.calledWith(appEnv.PORT);
    });

    it('should log port listening on', () => {
        env.stub(console, 'log');
        expressApp.listen.lastCall.args[1]();
        console.log.should.been.calledWith(sinon.match.string);
    });

});
