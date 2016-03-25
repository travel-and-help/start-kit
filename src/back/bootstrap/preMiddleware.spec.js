'use strict';

const proxyquire = require('proxyquire');

describe('bootstrap pre middleware', () => {

    let cors,
        bodyParser,
        app,
        result;

    beforeEach(() => {

        app = {
            use: env.spy(() => app)
        };

        cors = env.stub().returns({});

        bodyParser = {
            json: env.stub().returns({})
        };

        result = proxyquire('./preMiddleware', {
            cors,
            'body-parser': bodyParser
        })(app);
    });

    it('should add cors filter', () => {
        app.use.should.been.calledWith(cors());
    });

    it('should add json body parser', () => {
        app.use.should.been.calledWith(bodyParser.json());
    });

    it('should return app', () => {
        result.should.equal(app);
    });

});
